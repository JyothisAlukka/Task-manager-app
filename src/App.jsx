import { useState } from 'react'
import AuthPage from './components/AuthPage'
import Board from './components/Board'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [user, setUser] = useLocalStorage('tm_session', null)
  return user
    ? <Board user={user} onLogout={() => setUser(null)} />
    : <AuthPage onLogin={setUser} />
}
