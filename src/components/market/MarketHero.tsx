'use client'
import { useEffect, useState } from 'react'

export default function MarketHero() {
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/mandi')
      .then(res => {
        if (!res.ok) throw new Error('Unable to load market prices')
        return res.json()
      })
      .then(setPrices)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {loading ? [1,2,3,4].map(i => (
        <div key={i} className="rounded-xl p-4 h-28 animate-pulse" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }} />
      )) : error ? (
        <div className="col-span-full rounded-xl p-6 text-center text-sm" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', color: '#8a8a7a' }}>
          Live Mandi prices are temporarily unavailable. Please try again shortly.
        </div>
      ) : prices.map(({ crop, price, change, up, market }) => (
        <div key={crop} className="rounded-xl p-4 transition-all"
          style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(22,163,74,0.3)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: '#4a4a3a' }}>{crop}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: up ? 'rgba(22,163,74,0.08)' : 'rgba(239,68,68,0.08)', color: up ? '#16a34a' : '#dc2626' }}>
              {change}
            </span>
          </div>
          <div className="text-2xl font-bold" style={{ color: '#1a1a14' }}>{price}</div>
          <div className="text-xs mt-1" style={{ color: '#8a8a7a' }}>/quintal · {market}</div>
        </div>
      ))}
    </div>
  )
}
