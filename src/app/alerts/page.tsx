'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { DEFAULT_LOCATION } from '@/lib/config'
import { useLocation } from '@/context/LocationContext'

type Weather = { main?: { temp?: number; humidity?: number }; weather?: Array<{ main?: string; description?: string }> }

export default function AlertsPage() {
  const { location } = useLocation()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const activeLocation = location ?? DEFAULT_LOCATION
    fetch(`/api/weather?lat=${activeLocation.lat}&lon=${activeLocation.lon}&type=current`)
      .then(response => response.json())
      .then(setWeather)
      .finally(() => setLoading(false))
  }, [location])

  const alerts = useMemo(() => {
    const temp = Math.round(weather?.main?.temp ?? 28)
    const humidity = weather?.main?.humidity ?? 60
    const condition = weather?.weather?.[0]?.main ?? 'Clear'
    const items = [] as Array<{ icon: string; title: string; level: string; detail: string; color: string }>
    if (condition === 'Rain' || humidity >= 75) items.push({ icon: '🌧️', title: 'Drainage & fungal risk', level: 'Act today', detail: `Humidity is ${humidity}%. Avoid evening irrigation and inspect drainage around crop beds.`, color: '#2563eb' })
    if (temp >= 35) items.push({ icon: '☀️', title: 'Heat stress watch', level: 'High attention', detail: `${temp}°C can increase evaporation. Irrigate early morning and avoid midday spraying.`, color: '#d97706' })
    if (temp > 28 && humidity < 45) items.push({ icon: '🕷️', title: 'Spider mite conditions', level: 'Monitor', detail: 'Warm, dry conditions can favour mites. Check the underside of leaves during your field walk.', color: '#a855f7' })
    if (items.length === 0) items.push({ icon: '✅', title: 'Field conditions stable', level: 'Good', detail: `${temp}°C and ${humidity}% humidity are suitable for routine farm activity. Continue regular crop inspections.`, color: '#16a34a' })
    return items
  }, [weather])

  return (
    <main className="relative min-h-screen" style={{ background: '#f5f0e8' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <Navbar />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: '#b45309', background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.20)' }}>Live Alerts Center</span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3" style={{ color: '#1a1a14' }}>What needs attention today?</h1>
        <p className="text-sm mt-2 mb-7" style={{ color: '#6a6a5a' }}>Weather-based actions for {location?.display ?? DEFAULT_LOCATION.display}.</p>
        {loading ? <div className="h-52 rounded-2xl animate-pulse" style={{ background: 'white' }} /> : <div className="space-y-4">{alerts.map(alert => <article key={alert.title} className="p-4 sm:p-5 rounded-2xl flex items-start gap-3 sm:gap-4" style={{ background: 'white', border: `1px solid ${alert.color}24` }}><div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: `${alert.color}12` }}>{alert.icon}</div><div className="flex-1 min-w-0"><div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2"><h2 className="text-sm font-semibold" style={{ color: '#1a1a14' }}>{alert.title}</h2><span className="text-xs px-2 py-1 rounded-full self-start min-[420px]:self-auto" style={{ color: alert.color, background: `${alert.color}10` }}>{alert.level}</span></div><p className="text-sm leading-relaxed mt-2" style={{ color: '#6a6a5a' }}>{alert.detail}</p></div></article>)}</div>}
        <div className="mt-5 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: '#102517', border: '1px solid rgba(74,222,128,0.16)' }}><div><p className="text-sm font-semibold text-white">Want a crop-specific recommendation?</p><p className="text-xs mt-1" style={{ color: 'rgba(220,252,231,0.55)' }}>Use AI Advisory with your crop profile and live weather.</p></div><Link href="/advisory" className="text-xs font-semibold px-3 py-2 rounded-xl" style={{ color: '#dcfce7', border: '1px solid rgba(74,222,128,0.28)' }}>Open AI Advisory →</Link></div>
      </div>
    </main>
  )
}
