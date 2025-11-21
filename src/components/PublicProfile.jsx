import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, API_BASE } from '../lib/api'

function Button({ variant='glass', children }){
  if(variant==='black') return <a className="w-full h-12 bg-white text-black uppercase tracking-[0.2em] text-[10px] grid place-items-center hover:opacity-90">{children}</a>
  if(variant==='white') return <a className="w-full h-12 bg-black text-white uppercase tracking-[0.2em] text-[10px] grid place-items-center hover:opacity-80">{children}</a>
  return <a className="w-full h-12 border border-white/40 text-white uppercase tracking-[0.2em] text-[10px] grid place-items-center hover:bg-white/10">{children}</a>
}

export default function PublicProfile(){
  const { username } = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{
    (async ()=>{
      const data = await apiGet(`/profiles/${username}`)
      setP(data)
      try { await fetch(`${API_BASE}/analytics/view/${username}`, { method: 'POST' }) } catch {}
    })()
  }, [username])
  if(!p) return null

  const bg = {
    'pure-black': 'linear-gradient(180deg,#000,#0a0a0a)',
    'charcoal': 'linear-gradient(180deg,#0a0a0a,#0f0f10 50%,#0a0a0a)',
    'white-glass': 'linear-gradient(180deg,#090909,#0c0c0d)',
    'black-glass': 'linear-gradient(180deg,#050505,#0a0a0a)'
  }[p.background]

  return (
    <div className="min-h-screen grid place-items-center text-white px-6" style={{ background: bg }}>
      <div className="w-full max-w-md border border-white/15 bg-white/5 backdrop-blur-[50px] p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 border border-white/30 bg-white/10" />
          <div className="mt-5 text-4xl font-extralight tracking-tight">{p.display_name}</div>
          <div className="mt-2 text-xs text-white/70" style={{ letterSpacing: p.letter_spacing==='wide'?'.14em':p.letter_spacing==='tight'?'-0.01em':'0.02em', textAlign: p.bio_align }}>{p.bio}</div>
          <div className="mt-8 w-full space-y-3">
            {(p.links||[]).map(l => (
              <Button key={l.id} variant={l.style || p.button_style}>{l.title}</Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
