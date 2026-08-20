'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocation } from '@/context/LocationContext'
import FarmReportButton from './FarmReportButton'

type Weather = {
  main?: { temp?: number; humidity?: number }
  weather?: Array<{ main?: string; description?: string }>
}

type MandiPrice = { crop: string; price: string; market: string }

export default function FarmPulse() {
  const { location } = useLocation()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [prices, setPrices] = useState<MandiPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!location) return

    Promise.all([
      fetch(`/api/weather?lat=${location.lat}&lon=${location.lon}&type=current`).then(res => {
        if (!res.ok) throw new Error('Weather unavailable')
        return res.json()
      }),
      fetch('/api/mandi').then(res => {
        if (!res.ok) throw new Error('Mandi unavailable')
        return res.json()
      }),
    ])
      .then(([liveWeather, mandiPrices]) => {
        setWeather(liveWeather)
        setPrices(mandiPrices)
      })
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [location])

  const brief = useMemo(() => {
    const temp = Math.round(weather?.main?.temp ?? 28)
    const humidity = weather?.main?.humidity ?? 60
    const condition = weather?.weather?.[0]?.main ?? 'Clear'
    const topMarket = prices.find(item => item.price !== 'N/A')

    if (condition === 'Rain' || humidity >= 75) {
      return {
        tone: '#38bdf8',
        background: 'rgba(56,189,248,0.08)',
        label: 'Irrigation watch',
        action: 'Pause irrigation and inspect drainage today.',
        reason: `Humidity is ${humidity}%${condition === 'Rain' ? ' with rain detected' : ''}, increasing fungal and waterlogging risk.`,
        icon: '🌧️',
      }
    }

    if (temp >= 35) {
      return {
        tone: '#f59e0b',
        background: 'rgba(245,158,11,0.10)',
        label: 'Heat protection',
        action: 'Irrigate early morning and avoid midday spraying.',
        reason: `The field is at ${temp}°C; early irrigation reduces heat stress and evaporation loss.`,
        icon: '☀️',
      }
    }

    return {
      tone: '#22c55e',
      background: 'rgba(34,197,94,0.09)',
      label: 'Field conditions stable',
      action: 'Inspect leaves and follow your planned crop schedule.',
      reason: `${temp}°C and ${humidity}% humidity are within a workable range for routine field activity.`,
      icon: '🌱',
    }
  }, [weather, prices])

  if (loading || !location) {
    return <div className="h-36 mb-4 rounded-2xl animate-pulse" style={{ background: 'rgba(22,163,74,0.06)' }} />
  }

  return (
    <section className="mb-5 overflow-hidden rounded-2xl p-5" style={{ background: '#102517', border: '1px solid rgba(74,222,128,0.18)', boxShadow: '0 10px 30px rgba(22,163,74,0.08)' }}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: brief.background }}>
            {brief.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#86efac' }}>KhetSathi AI Farm Pulse</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: brief.tone, background: brief.background }}>{brief.label}</span>
            </div>
            <h2 className="text-base font-semibold text-white">{brief.action}</h2>
            <p className="text-xs mt-1 max-w-xl" style={{ color: 'rgba(220,252,231,0.58)' }}>{brief.reason}</p>
          </div>
        </div>

        <div className="min-w-[220px]">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-xs" style={{ color: 'rgba(220,252,231,0.45)' }}>Live weather</p>
              <p className="text-sm font-semibold text-green-100 mt-0.5">{Math.round(weather?.main?.temp ?? 28)}°C · {weather?.main?.humidity ?? 60}%</p>
            </div>
            <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <p className="text-xs" style={{ color: 'rgba(220,252,231,0.45)' }}>Market signal</p>
              <p className="text-sm font-semibold text-green-100 mt-0.5">{prices.find(item => item.price !== 'N/A')?.price ?? 'Syncing'} </p>
            </div>
          </div>
          <FarmReportButton />
        </div>
      </div>
      <p className="text-xs mt-4 pt-3" style={{ color: 'rgba(220,252,231,0.36)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        Explainable recommendation generated from live weather and government Mandi data for {location.display}.
      </p>
    </section>
  )
}
