
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
import type { AuthState } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

type Mode = 'login' | 'register'

export function AuthPage({ auth }: { auth: AuthState }) {
  const navigate = useNavigate()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    setError('')
    setMessage('')

    if (mode === 'register' && password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов.')
      return
    }

    setPending(true)

    try {
      if (mode === 'register') {
        const { data, error: authError } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              emailRedirectTo: window.location.origin,
            },
          })

        if (authError) throw authError

        if (data.session) {
          navigate('/notes', { replace: true })
        } else {
          setMessage(
            'Проверьте почту и подтвердите регистрацию.'
          )
        }
      } else {
        const { error: authError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })

        if (authError) throw authError

        navigate('/notes', { replace: true })
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ошибка авторизации.'
      )
    } finally {
      setPending(false)
    }
  }

  if (auth.status === 'checking') {
    return <p role="status">Проверяем сессию…</p>
  }

  if (auth.status === 'authenticated') {
    return <Navigate to="/notes" replace />
  }

  return (
    <main className="app">
      <section>
        <h1>
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h1>

        <div>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              setMode('login')
              setError('')
              setMessage('')
            }}
          >
            Вход
          </button>

          <button
            type="button"
            disabled={pending}
            onClick={() => {
              setMode('register')
              setError('')
              setMessage('')
            }}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={(e) => { void handleSubmit(e) }}>
          <div>
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              value={email}
              required
              disabled={pending}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="auth-password">Пароль</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={
                mode === 'register'
                  ? 'new-password'
                  : 'current-password'
              }
              value={password}
              required
              disabled={pending}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p role="alert">{error}</p>}
          {message && <p role="status">{message}</p>}

          <button type="submit" disabled={pending}>
            {pending
              ? 'Подождите…'
              : mode === 'login'
                ? 'Войти'
                : 'Зарегистрироваться'}
          </button>
        </form>
      </section>
    </main>
  )
}
