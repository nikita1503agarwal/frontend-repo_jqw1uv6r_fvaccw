import { useEffect, useMemo, useState } from 'react'
import { apiAuthGet, apiAuthPut } from '../lib/api'
import { motion, Reorder } from 'framer-motion'

const bgOptions = [
  { id: 'pure-black', label: 'Pure black' },
  { id: 'charcoal', label: 'Charcoal gradient' },
  { id: 'white-glass', label: 'White glass' },
  { id: 'black-glass', label: 'Black glass' },
]

const btnOptions = [
  { id: 'black', label: 'Black' },
  { id: 'white', label: 'White' },
  { id: 'glass', label: 'Glass outline' },
]

function Sidebar(){
  return (
    <div className="h-full border-r border-white/10 bg-white/5 backdrop-blur-[40px] text-white w-16 flex flex-col items-center py-6 gap-6">
      <div className="w-6 h-6 border border-white/40" />
      <div className="w-6 h-6 border border-white/40" />
      <div className="w-6 h-6 border border-white/40" />
    </div>
  )
}

function ControlRow({ label, children }){
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      <div className="text-[11px] uppercase tracking-[0.25em] text-white/60">{label}</div>
      <div className="ml-6">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange, options }){
  return (
    <div className="inline-flex border border-white/20">
      {options.map(opt => (
        <button key={opt.id} onClick={()=>onChange(opt.id)} className={`px-3 py-2 text-xs tracking-widest ${value===opt.id?'bg-white text-black':'text-white/80 hover:bg-white/10'}`}>{opt.label}</button>
      ))}
    </div>
  )
}

function Input({ value, onChange, placeholder }){
  return <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="bg-transparent border border-white/20 px-3 py-2 text-sm focus:outline-none" />
}

function PreviewPhone({ profile }){
  const bg = {
    'pure-black': 'linear-gradient(180deg,#000,#0a0a0a)',
    'charcoal': 'linear-gradient(180deg,#0a0a0a,#0f0f10 50%,#0a0a0a)',
    'white-glass': 'linear-gradient(180deg,#090909,#0c0c0d)',
    'black-glass': 'linear-gradient(180deg,#050505,#0a0a0a)'
  }[profile.background]

  return (
    <div className="w-[320px] h-[640px] border border-white/10 bg-white/5 backdrop-blur-[40px] p-6 text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]" style={{ background: bg }}>
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 border border-white/30 bg-white/10" />
        <div className="mt-4 text-2xl font-extralight tracking-tight">{profile.display_name}</div>
        <div className="mt-1 text-xs text-white/70" style={{ letterSpacing: profile.letter_spacing==='wide'?'.14em':profile.letter_spacing==='tight'?'-0.01em':'0.02em', textAlign: profile.bio_align }}>{profile.bio}</div>
        <div className="mt-6 w-full space-y-3">
          {profile.links.map((l)=>{
            if(profile.button_style==='black' || l.style==='black') return <button key={l.id} className="w-full h-10 bg-white text-black uppercase tracking-[0.2em] text-[10px]">{l.title}</button>
            if(profile.button_style==='white' || l.style==='white') return <button key={l.id} className="w-full h-10 bg-black text-white uppercase tracking-[0.2em] text-[10px]">{l.title}</button>
            return <button key={l.id} className="w-full h-10 border border-white/40 text-white uppercase tracking-[0.2em] text-[10px] hover:bg-white/10">{l.title}</button>
          })}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard(){
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])

  useEffect(()=>{
    (async ()=>{
      const p = await apiAuthGet('/profiles/me')
      setProfile(p)
      setLinks(p.links)
    })()
  }, [])

  if(!profile) return <div className="min-h-screen grid place-items-center text-white" style={{ background: 'linear-gradient(180deg,#0a0a0a,#0e0e0f 40%,#0a0a0a)'}}>Loading…</div>

  function update(field, value){ setProfile(prev=>({ ...prev, [field]: value })) }

  async function save(){
    const payload = { ...profile, links }
    const updated = await apiAuthPut('/profiles/me', payload)
    setProfile(updated)
    setLinks(updated.links)
  }

  function addLink(){
    setLinks(ls=>[...ls, { id: Math.random().toString(36).slice(2), title: 'New Link', url: 'https://', style: 'glass', order: (ls[ls.length-1]?.order||0)+1 }])
  }

  return (
    <div className="min-h-screen grid grid-cols-[64px_1fr_380px]" style={{ background: 'linear-gradient(180deg,#0a0a0a,#0e0e0f 40%,#0a0a0a)'}}>
      <Sidebar />

      <div className="p-8 border-r border-white/10 bg-white/5 backdrop-blur-[40px] text-white">
        <div className="text-sm uppercase tracking-[0.25em] text-white/60">Editor</div>
        <div className="mt-6 space-y-4">
          <ControlRow label="Display name"><Input value={profile.display_name} onChange={v=>update('display_name', v)} /></ControlRow>
          <ControlRow label="Bio"><Input value={profile.bio} onChange={v=>update('bio', v)} /></ControlRow>
          <ControlRow label="Background"><Toggle value={profile.background} onChange={v=>update('background', v)} options={bgOptions} /></ControlRow>
          <ControlRow label="Buttons"><Toggle value={profile.button_style} onChange={v=>update('button_style', v)} options={btnOptions} /></ControlRow>
          <div className="pt-4">
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-3">Links</div>
            <Reorder.Group axis="y" values={links} onReorder={setLinks}>
              {links.map((l)=> (
                <Reorder.Item key={l.id} value={l}>
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-2 h-6 bg-white/30" />
                    <Input value={l.title} onChange={v=>setLinks(ls=>ls.map(x=>x.id===l.id?{...x, title:v}:x))} />
                    <Input value={l.url} onChange={v=>setLinks(ls=>ls.map(x=>x.id===l.id?{...x, url:v}:x))} />
                    <button onClick={()=>setLinks(ls=>ls.filter(x=>x.id!==l.id))} className="text-xs text-white/60 hover:text-white">Remove</button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <button onClick={addLink} className="mt-3 px-3 py-2 border border-white/30 text-xs tracking-widest hover:bg-white/10">Add link</button>
          </div>
          <div className="pt-6">
            <button onClick={save} className="px-5 py-2 bg-white text-black uppercase tracking-[0.2em] text-xs hover:opacity-90">Save</button>
          </div>
        </div>
      </div>

      <div className="p-8 text-white">
        <div className="text-sm uppercase tracking-[0.25em] text-white/60">Live preview</div>
        <div className="mt-6">
          <PreviewPhone profile={{...profile, links}} />
        </div>
      </div>
    </div>
  )
}
