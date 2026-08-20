import { NextResponse } from 'next/server'
import { API_URLS, MANDI_RESOURCE_ID, MANDI_DEFAULT_COMMODITIES } from '@/lib/config'

type MandiPrice = {
  crop: string
  price: string
  change: string | null
  up: boolean
  market: string
}

const CACHE_DURATION_MS = 15 * 60 * 1000
let cache: { expiresAt: number; data: MandiPrice[] } | null = null
let pendingRequest: Promise<MandiPrice[]> | null = null

async function fetchMandiPrices(): Promise<MandiPrice[]> {
  const results = await Promise.all(
    MANDI_DEFAULT_COMMODITIES.map(async (commodity) => {
      try {
        const url = `${API_URLS.dataGovIn}/${MANDI_RESOURCE_ID}?api-key=${process.env.DATA_GOV_API_KEY}&format=json&filters%5Bcommodity%5D=${encodeURIComponent(commodity)}&limit=10`
        const res = await fetch(url, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Mandi API returned ${res.status}`)
        const data = await res.json()
        const records: any[] = data.records ?? []
        const record = records[0]
        const price = Number(record?.modal_price ?? 0)

        const sameMarketPrev = records.slice(1).find(
          (r: any) => r.market === record?.market && r.modal_price && r.modal_price !== record.modal_price
        )

        let change = '0'
        let hasChange = false
        if (sameMarketPrev) {
          const prevPrice = Number(sameMarketPrev.modal_price)
          if (prevPrice > 0) {
            change = (((price - prevPrice) / prevPrice) * 100).toFixed(1)
            hasChange = true
          }
        }

        return {
          crop: commodity,
          price: price > 0 ? `₹${price}` : 'N/A',
          change: hasChange ? `${Number(change) >= 0 ? '+' : ''}${change}%` : null,
          up: Number(change) >= 0,
          market: record?.market ?? 'N/A',
        }
      } catch {
        return { crop: commodity, price: 'N/A', change: null, up: true, market: 'N/A' }
      }
    })
  )

  return results
}

export async function GET() {
  if (cache && cache.expiresAt > Date.now()) {
    return NextResponse.json(cache.data, { headers: { 'X-Data-Source': 'cache' } })
  }

  pendingRequest ??= fetchMandiPrices()
  try {
    const results = await pendingRequest
    if (results.every(({ price }) => price === 'N/A')) {
      return NextResponse.json(
        { error: 'Mandi prices are temporarily unavailable. Please try again shortly.' },
        { status: 503 }
      )
    }
    cache = { data: results, expiresAt: Date.now() + CACHE_DURATION_MS }
    return NextResponse.json(results, { headers: { 'X-Data-Source': 'live' } })
  } finally {
    pendingRequest = null
  }
}
