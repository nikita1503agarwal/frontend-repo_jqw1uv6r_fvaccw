import { useEffect, useState } from 'react'
import { apiAuthGet, apiAuthPost } from '../lib/api'

function Bar(){
  return (
    <div className="border-b border-white/15 bg-white/5 backdrop-blur-[40px] text-white px-6 py-4 flex items-center justify-between">
      <div className="text-xs uppercase tracking-[0.25em] text-white/70">Admin</div>
      <div className="text-xs text-white/50">opps.cc</div>
    </div>
  )
}

export default function Admin(){
  const [stats, setStats] = useState(null)
  const [enabled, setEnabled] = useState(true)
  const [anns, setAnns] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(()=>{
    (async ()=>{
      const s = await apiAuthGet('/admin/stats'); setStats(s)
      const a = await apiAuthGet('/admin/announcements'); setAnns(a)
    })()
  }, [])

  async function toggle(){
    const res = await apiAuthPost('/admin/toggle-signups', { enabled: !enabled })
    setEnabled(res.enabled)
  }

  async function addAnn(){
    await apiAuthPost('/admin/announcements', { title, body, active: true })
    const a = await apiAuthGet('/admin/announcements'); setAnns(a)
    setTitle(''); setBody('')
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg,#0a0a0a,#0e0e0f 40%,#0a0a0a)'}}>
      <Bar />
      <div className="p-8 grid md:grid-cols-2 gap-8">
        <div className="border border-white/15 bg-white/5 backdrop-blur-[40px] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60 mb-4">Platform stats</div>
          {stats && <div className="text-sm space-y-1 text-white/80">
            <div>Users: {stats.users}</div>
            <div>Profiles: {stats.profiles}</div>
            <div>Views: {stats.views}</div>
          </div>}
        </div>
        <div className="border border-white/15 bg-white/5 backdrop-blur-[40px] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60 mb-4">Signups</div>
          <button onClick={toggle} className="px-4 py-2 border border-white/30 text-xs tracking-widest hover:bg-white/10">{enabled? 'Disable' : 'Enable'}</button>
        </div>
        <div className="md:col-span-2 border border-white/15 bg-white/5 backdrop-blur-[40px] p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60 mb-4">Announcements</div>
          <div className="flex gap-2 mb-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="bg-transparent border border-white/20 px-3 py-2 text-sm focus:outline-none" />
            <input value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" className="flex-1 bg-transparent border border-white/20 px-3 py-2 text-sm focus:outline-none" />
            <button onClick={addAnn} className="px-4 py-2 bg-white text-black text-xs uppercase tracking-[0.2em]">Add</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/80">
              <thead className="text-white/60">
                <tr><th className="text-left py-2">Title</th><th className="text-left">Body</th></tr>
              </thead>
              <tbody>
                {anns.map(a=> (
                  <tr key={a._id} className="border-t border-white/10"><td className="py-2">{a.title}</td><td>{a.body}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
