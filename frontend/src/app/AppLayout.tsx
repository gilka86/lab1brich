
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import { supabase } from '../lib/supabase'

export function AppLayout({ email }: { email: string }) {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSignOut() {
    setPending(true)
    setError('')

    try {
      const { error: authError } =
        await supabase.auth.signOut({
          scope: 'local',
        })

      if (authError) throw authError
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Не удалось выйти.'
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="app">
      <header>
        <p className="app-title">Мои заметки</p>

        <nav aria-label="Основная навигация">
          <NavLink to="/notes" end>
            Заметки
          </NavLink>

          <NavLink to="/notes/new">
            Создать
          </NavLink>
        </nav>

        <p>Вы вошли как: {email}</p>

        <button
          type="button"
          disabled={pending}
          onClick={() => { void handleSignOut() }}
        >
          Выйти
        </button>

        {error && <p role="alert">{error}</p>}
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
