'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'

type Entry = { id: string; date: string; crop: string; note: string }

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [crop, setCrop] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('khetsathi_farm_journal')
    if (saved) setEntries(JSON.parse(saved))
  }, [])

  function addEntry() {
    if (!note.trim()) return
    const entry = { id: crypto.randomUUID(), date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), crop: crop.trim() || 'General farm note', note: note.trim() }
    const updated = [entry, ...entries]
    setEntries(updated)
    localStorage.setItem('khetsathi_farm_journal', JSON.stringify(updated))
    setCrop(''); setNote('')
  }

  return (
    <main className="relative min-h-screen" style={{ background: '#f5f0e8' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <Navbar />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: '#7c3aed', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.16)' }}>Farm Journal</span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3" style={{ color: '#1a1a14' }}>Capture field observations</h1>
        <p className="text-sm mt-2 mb-7" style={{ color: '#6a6a5a' }}>Build a useful history of crop conditions, treatments, and results.</p>
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5">
          <section className="rounded-2xl p-5 h-fit" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1a1a14' }}>New observation</h2>
            <input value={crop} onChange={event => setCrop(event.target.value)} placeholder="Crop name (optional)" className="w-full rounded-xl px-3 py-2.5 text-sm outline-none mb-3" style={{ border: '1px solid rgba(0,0,0,0.12)', color: '#1a1a14' }} />
            <textarea value={note} onChange={event => setNote(event.target.value)} placeholder="e.g. Yellow spots on tomato leaves in the north plot; applied neem spray." rows={5} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none" style={{ border: '1px solid rgba(0,0,0,0.12)', color: '#1a1a14' }} />
            <button onClick={addEntry} className="w-full mt-3 rounded-xl py-2.5 text-sm font-semibold" style={{ background: '#16a34a', color: 'white' }}>Save observation</button>
          </section>
          <section className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="flex items-center justify-between gap-3 mb-4"><h2 className="text-sm font-semibold" style={{ color: '#1a1a14' }}>Observation timeline</h2><span className="text-xs flex-shrink-0" style={{ color: '#8a8a7a' }}>{entries.length} saved</span></div>
            {entries.length === 0 ? <div className="py-14 text-center"><div className="text-3xl mb-3">📓</div><p className="text-sm" style={{ color: '#6a6a5a' }}>Your journal is ready for its first field note.</p></div> : <div className="space-y-3">{entries.map(entry => <article key={entry.id} className="p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.12)' }}><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold" style={{ color: '#1a1a14' }}>🌱 {entry.crop}</h3><span className="text-xs" style={{ color: '#8a8a7a' }}>{entry.date}</span></div><p className="text-sm leading-relaxed mt-2" style={{ color: '#4a4a3a' }}>{entry.note}</p></article>)}</div>}
          </section>
        </div>
      </div>
    </main>
  )
}
