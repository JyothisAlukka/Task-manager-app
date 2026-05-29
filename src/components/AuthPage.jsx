import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useLocalStorage('tm_users', [])

  function submit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    setTimeout(() => {
      if (mode === 'register') {
        if (!name.trim()) { setErr('Name is required'); setLoading(false); return }
        if (users.find(u => u.email === email)) { setErr('Email already registered'); setLoading(false); return }
        if (pw.length < 6) { setErr('Password must be at least 6 characters'); setLoading(false); return }
        const user = { id: Date.now(), name: name.trim(), email: email.trim(), pw }
        const updated = [...users, user]
        setUsers(updated)
        localStorage.setItem('tm_users', JSON.stringify(updated))
        onLogin(user)
      } else {
        const stored = JSON.parse(localStorage.getItem('tm_users') || '[]')
        const u = stored.find(x => x.email === email.trim() && x.pw === pw)
        if (!u) { setErr('Invalid email or password'); setLoading(false); return }
        onLogin(u)
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <h2 className="sr-only">Taskflow authentication</h2>
      <div className="card" style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span style={{ fontSize: '17px', fontWeight: 600 }}>Taskflow</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
            {mode === 'login' ? 'Welcome back — sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {err && <div className="err">{err}</div>}

        <form onSubmit={submit}>
          {mode === 'register' && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Full name</label>
              <input placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} required />
            </div>
          )}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>Password</label>
            <input type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} required minLength={6} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '1rem', textAlign: 'center' }}>
          {mode === 'login' ? 'No account? ' : 'Already have one? '}
          <span
            style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => { setErr(''); setMode(mode === 'login' ? 'register' : 'login') }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  )
}
