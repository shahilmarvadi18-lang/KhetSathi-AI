'use client'
import { useEffect, useState } from 'react'

export default function PriceTable() {
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

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

  const filtered = prices.filter(p => p.crop.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="rounded-xl p-5" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
      <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold" style={{ color: '#1a1a14' }}>Key commodities</h2>
            <p className="text-xs mt-0.5" style={{ color: '#8a8a7a' }}>Government Mandi records · refreshed every 15 min</p>
          </div>
        <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
          className="text-xs px-3 py-1.5 rounded-lg outline-none w-full min-[420px]:w-32"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', color: '#1a1a14' }} />
      </div>
      <div className="space-y-1 overflow-x-auto">
        <div className="grid grid-cols-[minmax(100px,1.3fr)_minmax(76px,1fr)_minmax(60px,.8fr)_minmax(90px,1fr)] min-w-[360px] px-2 pb-2 text-xs" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', color: '#b0b0a0', fontSize: 10 }}>
          <span>Commodity</span><span>Price/q</span><span>Change</span><span>Market</span>
        </div>
        {loading ? [1, 2, 3, 4].map(i => (
          <div key={i} className="h-8 rounded animate-pulse mx-2" style={{ background: 'rgba(0,0,0,0.04)' }} />
        )) : error ? (
          <div className="px-3 py-8 text-center text-xs" style={{ color: '#8a8a7a' }}>
            Market data is temporarily unavailable. Please try again shortly.
          </div>
        ) : filtered.map(({ crop, price, change, up, market }) => (
          <div key={crop} className="grid grid-cols-[minmax(100px,1.3fr)_minmax(76px,1fr)_minmax(60px,.8fr)_minmax(90px,1fr)] min-w-[360px] items-center px-2 py-2 rounded-lg transition-all"
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.025)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <span className="text-xs font-medium" style={{ color: '#1a1a14' }}>{crop}</span>
            <span className="text-xs font-semibold" style={{ color: '#16a34a' }}>{price}</span>
            <span className="text-xs font-medium" style={{ color: change == null ? '#b0b0a0' : up ? '#16a34a' : '#dc2626' }}>{change ?? '—'}</span>
            <span className="truncate" style={{ color: '#8a8a7a', fontSize: 10 }}>{market}</span>
          </div>
        ))}
        {!loading && !error && filtered.length === 0 && (
          <div className="px-3 py-8 text-center text-xs" style={{ color: '#8a8a7a' }}>No matching commodity found.</div>
        )}
      </div>
    </div>
  )
}
