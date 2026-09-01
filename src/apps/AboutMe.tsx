import { motion } from 'framer-motion'
import { Code, Rocket } from 'lucide-react'

export default function AboutMe() {
  return (
    <div style={{
      padding: 32,
      height: '100%',
      color: 'var(--color-text-primary)',
      background: 'linear-gradient(to bottom, rgba(20,15,22,0.8), rgba(10,5,12,0.9))',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, background: 'linear-gradient(45deg, #7EDDD6, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          OrbitOS
        </h1>
        <p style={{ fontSize: 18, color: 'var(--color-text-secondary)', marginTop: 8 }}>
          A next-generation web operating system.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginTop: 32, lineHeight: 1.6, maxWidth: 400 }}>
        <p>Built with React, Vite, and Framer Motion.</p>
        <p style={{ marginTop: 16 }}>Welcome to OrbitOS! This is a custom desktop environment featuring an ISS Tracker, dynamic dock, window management, and terminal emulation.</p>
      </motion.div>

      <motion.div style={{ display: 'flex', gap: 12, marginTop: 32 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {[
          { Icon: Rocket, label: 'Hack Club', href: 'https://hackclub.com' },
          { Icon: Code, label: 'GitHub', href: 'https://github.com' }
        ].map(({ Icon, label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            background: 'rgba(255,255,255,0.05)', borderRadius: 8, color: 'inherit', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Icon size={16} /> {label}
          </a>
        ))}
      </motion.div>
    </div>
  )
}
