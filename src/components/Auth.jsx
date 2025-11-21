import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { apiPost } from '../lib/api'

function Panel({ children }) {
  return (
    <div className="border border-white/15 bg-white/5 backdrop-blur-[50px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] p-8 text-white">
      {children}
    </div>
  )
}

function Input({ label, type='text', value, onChange, placeholder }){
  return (
    <label className="block mb-6">
      <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-2">{label}</div>
      <input
        type={type}
        className="w-full bg-transparent border border-white/25 px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white/60 placeholder-white/30"
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

export function RegisterPage(){
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await apiPost('/auth/register', { email, username, password })
      localStorage.setItem('opps_token', res.token)
      nav('/dashboard')
    }catch(err){
      setError('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#0a0a0a, #0e0e0f 40%, #0a0a0a)'}}>
      <Panel>
        <h1 className="text-4xl font-extralight tracking-tight">Create your page</h1>
        <form onSubmit={submit} className="mt-8 w-96 max-w-full">
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@opps.cc" />
          <Input label="Username" value={username} onChange={setUsername} placeholder="yourname" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <div className="text-xs text-red-400 mb-4">{error}</div>}
          <button className="w-full mt-2 px-5 py-3 bg-white text-black uppercase tracking-[0.2em] text-xs hover:opacity-90">Create Page</button>
          <div className="text-xs text-white/60 mt-6">Already have an account? <Link className="underline" to="/login">Log in</Link></div>
        </form>
      </Panel>
    </div>
  )
}

export function LoginPage(){
  const [ident, setIdent] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await apiPost('/auth/login', { email_or_username: ident, password })
      localStorage.setItem('opps_token', res.token)
      nav('/dashboard')
    }catch(err){
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#0a0a0a, #0e0e0f 40%, #0a0a0a)'}}>
      <Panel>
        <h1 className="text-4xl font-extralight tracking-tight">Welcome back</h1>
        <form onSubmit={submit} className="mt-8 w-96 max-w-full">
          <Input label="Email or Username" value={ident} onChange={setIdent} placeholder="you@opps.cc or yourname" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          {error && <div className="text-xs text-red-400 mb-4">{error}</div>}
          <button className="w-full mt-2 px-5 py-3 bg-white text-black uppercase tracking-[0.2em] text-xs hover:opacity-90">Log In</button>
        </form>
        <div className="text-xs text-white/60 mt-6"><Link className="underline" to="/forgot">Forgot password</Link></div>
      </Panel>
    </div>
  )
}

export function ForgotPage(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState('')
  async function submit(e){
    e.preventDefault()
    const res = await apiPost('/auth/forgot', { email })
    setSent('Check your inbox. Token (demo): ' + (res.token || 'sent'))
  }
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg,#0a0a0a, #0e0e0f 40%, #0a0a0a)'}}>
      <Panel>
        <h1 className="text-4xl font-extralight tracking-tight">Reset password</h1>
        <form onSubmit={submit} className="mt-8 w-96 max-w-full">
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@opps.cc" />
          <button className="w-full mt-2 px-5 py-3 bg-white text-black uppercase tracking-[0.2em] text-xs hover:opacity-90">Send reset link</button>
        </form>
        {sent && <div className="text-xs text-white/80 mt-6">{sent}</div>}
      </Panel>
    </div>
  )
}
