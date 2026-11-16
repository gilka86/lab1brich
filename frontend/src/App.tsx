
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { AppLayout } from './app/AppLayout'
import { RequireAuth } from './components/RequireAuth'
import { useAuth } from './hooks/useAuth'

import { NotesPage } from './pages/NotesPage'
import { NoteDetailsPage } from './pages/NoteDetailsPage'
import { NewNotePage } from './pages/NewNotePage'
import { EditNotePage } from './pages/EditNotePage'
import { AuthPage } from './pages/AuthPage'
import { NotFoundPage } from './pages/NotFoundPage'

import type { Note, NoteDraft } from './types/note'

import {
  getNotes,
  createNote as insertNote,
  updateNote as saveNote,
  deleteNote as removeNote,
} from './services/notes'

import './App.css'

type NotesLoad = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  const auth = useAuth()

  const userId =
    auth.status === 'authenticated'
      ? auth.session.user.id
      : null

  const [notes, setNotes] = useState<Note[]>([])
  const [loadedUserId, setLoadedUserId] =
    useState<string | null>(null)

  const [notesLoad, setNotesLoad] =
    useState<NotesLoad>('idle')

  const [loadError, setLoadError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    setNotes([])
    setLoadedUserId(null)
    setLoadError('')

    if (!userId) {
      setNotesLoad('idle')
      return () => {
        active = false
      }
    }

    setNotesLoad('loading')

    void getNotes()
      .then((data) => {
        if (!active) return

        setNotes(data)
        setLoadedUserId(userId)
        setNotesLoad('success')
      })
      .catch((error: unknown) => {
        if (!active) return

        setLoadError(
          error instanceof Error
            ? error.message
            : 'Не удалось загрузить заметки.'
        )
        setNotesLoad('error')
      })

    return () => {
      active = false
    }
  }, [userId, attempt])

  async function refreshNotes() {
    const data = await getNotes()

    setNotes(data)
    setLoadedUserId(userId)
    setNotesLoad('success')
  }

  async function handleCreate(
    draft: NoteDraft
  ): Promise<string> {
    const saved = await insertNote(draft)
    await refreshNotes()
    return saved.id
  }

  async function handleUpdate(
    id: string,
    draft: NoteDraft
  ): Promise<void> {
    await saveNote(id, draft)
    await refreshNotes()
  }

  async function handleDelete(id: string): Promise<void> {
    await removeNote(id)
    await refreshNotes()
  }

  const currentNotes =
    loadedUserId === userId && userId !== null
      ? notes
      : []

  const listReady =
    notesLoad === 'success' &&
    loadedUserId === userId

  function listContent(children: ReactNode) {
    if (!listReady) {
      if (notesLoad === 'error') {
        return (
          <section>
            <p role="alert">{loadError}</p>

            <button
              type="button"
              onClick={() =>
                setAttempt((current) => current + 1)
              }
            >
              Повторить загрузку
            </button>
          </section>
        )
      }

      return (
        <p role="status">Загружаем заметки…</p>
      )
    }

    return children
  }

  return (
    <Routes>
      <Route
        path="/auth"
        element={<AuthPage auth={auth} />}
      />

      <Route element={<RequireAuth auth={auth} />}>
        <Route
          element={
            <AppLayout
              email={
                auth.status === 'authenticated'
                  ? auth.session.user.email ?? ''
                  : ''
              }
            />
          }
        >
          <Route
            index
            element={<Navigate to="/notes" replace />}
          />

          <Route
            path="notes"
            element={listContent(
              <NotesPage notes={currentNotes} />
            )}
          />

          <Route
            path="notes/new"
            element={listContent(
              <NewNotePage onCreate={handleCreate} />
            )}
          />

          <Route
            path="notes/:id"
            element={listContent(
              <NoteDetailsPage
                notes={currentNotes}
                onDelete={handleDelete}
              />
            )}
          />

          <Route
            path="notes/:id/edit"
            element={listContent(
              <EditNotePage
                notes={currentNotes}
                onUpdate={handleUpdate}
              />
            )}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}
