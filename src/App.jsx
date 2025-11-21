import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function GlassButton({ variant = 'solid', children, to }) {
  const base = 'px-5 py-2 text-sm uppercase tracking-[0.18em] transition-all duration-300 select-none inline-flex items-center justify-center border-[1px]'
  const styles = {
    solid: 'bg-white text-black border-white/10 hover:opacity-90',
    solidDark: 'bg-black text-white border-white/10 hover:opacity-80',
    ghost: 'bg-transparent text-white border-white/30 hover:bg-white/5',
  }
  const el = (
    <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }} className={`${base} ${styles[variant]} shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)]`}>{children}</motion.span>
  )
  return to ? <Link to={to}>{el}</Link> : el
}

function MockProfile({ i = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
      className="relative w-72 h-40 p-4 border border-white/15 bg-white/5 backdrop-blur-[40px] shadow-[0_35px_80px_-20px_rgba(0,0,0,0.6)] text-white select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 border border-white/25" />
        <div className="flex-1">
          <div className="h-3 bg-white/30 w-28 mb-2" />
          <div className="h-2 bg-white/20 w-40" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-8 bg-white text-black flex items-center justify-center text-[11px] tracking-widest">BLACK</div>
        <div className="h-8 border border-white/40 text-[11px] tracking-widest flex items-center justify-center">GLASS</div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const nav = useNavigate()
  useEffect(() => { document.title = 'opps.cc' }, [])

  return (
    <div className="min-h-screen relative overflow-hidden text-white" style={{ background: 'linear-gradient(180deg,#0a0a0a, #0e0e0f 40%, #0a0a0a)' }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.08),transparent), radial-gradient(800px_400px_at_-10%_30%,rgba(255,255,255,0.05),transparent)'}} />

      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <div className="text-sm tracking-[0.2em] uppercase text-white/70">opps.cc</div>
        <div className="flex gap-3">
          <GlassButton variant="ghost" to="/login">Log In</GlassButton>
          <GlassButton variant="solid">Create Page</GlassButton>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-12 lg:px-20">
        <section className="pt-20 md:pt-28 lg:pt-36 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <h1 className="text-[56px] md:text-[84px] leading-[0.9] font-extralight tracking-[-0.02em]">opps.cc</h1>
            <p className="mt-6 text-sm md:text-base text-white/70 max-w-xl leading-7">
              Identity. Refined. A link‑in‑bio experience built with intention. Pure. Minimal. Yours.
            </p>
            <div className="mt-10 flex gap-4">
              <GlassButton variant="solidDark" to="/register">Create Page</GlassButton>
              <GlassButton variant="ghost" to="/login">Log In</GlassButton>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="relative border border-white/15 bg-white/5 backdrop-blur-[60px] p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60 mb-4">Preview</div>
            <div className="grid grid-cols-2 gap-6">
              {[0,1,2,3].map((i)=> <MockProfile key={i} i={i} />)}
            </div>
          </motion.div>
        </section>

        <section className="py-24">
          <div className="text-center text-white/70 text-xs tracking-[0.25em] uppercase">Crafted for clarity</div>
          <h2 className="text-center mt-4 text-3xl md:text-5xl font-extralight">Luxury Apple‑style glassmorphism</h2>
        </section>
      </main>

      <footer className="relative z-10 px-10 py-10 text-white/40 text-xs tracking-widest">
        © {new Date().getFullYear()} opps.cc
      </footer>
    </div>
  )
}
