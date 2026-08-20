'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { useLocation } from '@/context/LocationContext'
import { DEFAULT_LOCATION } from '@/lib/config'

type Task = { id: string; day: string; title: string; detail: string; icon: string; done: boolean }

const INITIAL_TASKS: Task[] = [
  { id: 'morning-check', day: 'Today', title: 'Morning field walk', detail: 'Inspect leaves for pests, wilting, and standing water.', icon: '🔎', done: false },
  { id: 'irrigation', day: 'Today', title: 'Review irrigation need', detail: 'Use Farm Pulse weather guidance before watering.', icon: '💧', done: false },
  { id: 'crop-photo', day: 'Tomorrow', title: 'Scan one crop section', detail: 'Upload a clear leaf photo to record crop health.', icon: '🔬', done: false },
  { id: 'market-check', day: 'This week', title: 'Check Mandi prices', detail: 'Compare local market prices before planning sales.', icon: '📈', done: false },
]

export default function CalendarPage() {
  const { location } = useLocation()
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  useEffect(() => {
    const saved = localStorage.getItem('khetsathi_calendar_tasks')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  function toggleTask(id: string) {
    setTasks(current => {
      const updated = current.map(task => task.id === id ? { ...task, done: !task.done } : task)
      localStorage.setItem('khetsathi_calendar_tasks', JSON.stringify(updated))
      return updated
    })
  }

  const completed = tasks.filter(task => task.done).length
  const displayLocation = location?.display ?? DEFAULT_LOCATION.display

  return (
    <main className="relative min-h-screen" style={{ background: '#f5f0e8' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <Navbar />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: '#16a34a', background: 'rgba(22,163,74,0.09)', border: '1px solid rgba(22,163,74,0.18)' }}>Farm Planner</span>
            <h1 className="font-serif text-4xl mt-3" style={{ color: '#1a1a14' }}>Your crop calendar</h1>
            <p className="text-sm mt-2" style={{ color: '#6a6a5a' }}>Simple daily actions for {displayLocation}.</p>
          </div>
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <strong style={{ color: '#16a34a' }}>{completed}/{tasks.length}</strong><span style={{ color: '#8a8a7a' }}> actions complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
          <section className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-semibold" style={{ color: '#1a1a14' }}>Next field actions</h2><span className="text-xs" style={{ color: '#8a8a7a' }}>Tap to mark complete</span></div>
            <div className="space-y-3">
              {tasks.map(task => (
                <button key={task.id} onClick={() => toggleTask(task.id)} className="w-full flex items-start gap-3 text-left p-4 rounded-xl transition-all" style={{ background: task.done ? 'rgba(22,163,74,0.06)' : 'rgba(0,0,0,0.018)', border: `1px solid ${task.done ? 'rgba(22,163,74,0.20)' : 'rgba(0,0,0,0.07)'}` }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: task.done ? '#16a34a' : 'white', border: `1px solid ${task.done ? '#16a34a' : 'rgba(0,0,0,0.16)'}`, color: 'white' }}>{task.done ? '✓' : ''}</span>
                  <span className="flex-1"><span className="flex items-center justify-between gap-3"><span className="text-sm font-semibold" style={{ color: task.done ? '#6a6a5a' : '#1a1a14', textDecoration: task.done ? 'line-through' : 'none' }}>{task.icon} {task.title}</span><span className="text-xs" style={{ color: '#16a34a' }}>{task.day}</span></span><span className="block text-xs mt-1" style={{ color: '#8a8a7a' }}>{task.detail}</span></span>
                </button>
              ))}
            </div>
          </section>
          <aside className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: '#102517', border: '1px solid rgba(74,222,128,0.16)' }}>
              <p className="text-xs font-semibold" style={{ color: '#86efac' }}>SMART ROUTINE</p>
              <p className="text-sm font-semibold mt-2 text-white">Start every day with weather, then inspect your field.</p>
              <p className="text-xs mt-2" style={{ color: 'rgba(220,252,231,0.55)' }}>Your Farm Pulse updates these decisions with live conditions.</p>
              <Link href="/dashboard" className="inline-block mt-4 text-xs font-semibold" style={{ color: '#4ade80' }}>Open Farm Pulse →</Link>
            </div>
            <div className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p className="text-sm font-semibold" style={{ color: '#1a1a14' }}>Keep evidence</p>
              <p className="text-xs mt-1.5" style={{ color: '#8a8a7a' }}>Record observations and treatments in your journal for better AI advice.</p>
              <Link href="/journal" className="inline-block mt-4 text-xs font-semibold" style={{ color: '#16a34a' }}>Open Farm Journal →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
