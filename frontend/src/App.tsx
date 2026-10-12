import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { AppLayout } from './app/AppLayout'
import { NotesPage } from './pages/NotesPage'
import { NoteDetailsPage } from './pages/NoteDetailsPage'
import { NewNotePage } from './pages/NewNotePage'
import { EditNotePage } from './pages/EditNotePage'
import { NotFoundPage } from './pages/NotFoundPage'

import type { Note, NoteDraft } from './types/note'
import { notes as initialNotes } from './data/notes'

import './App.css'

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() =>
    initialNotes.map((note) => ({ ...note }))
  )

  function createNote(draft: NoteDraft): string {
    const id = crypto.randomUUID()

    setNotes((current) => [
      ...current,
      { ...draft, id },
    ])

    return id
  }

  function updateNote(id: string, draft: NoteDraft): void {
    setNotes((current) =>
      current.map((note) =>
        note.id === id
          ? { ...draft, id: note.id }
          : note
      )
    )
  }

  function deleteNote(id: string): void {
    setNotes((current) =>
      current.filter((note) => note.id !== id)
    )
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/notes" replace />} />

        <Route
          path="notes"
          element={<NotesPage notes={notes} />}
        />

        <Route
          path="notes/new"
          element={<NewNotePage onCreate={createNote} />}
        />

        <Route
          path="notes/:id"
          element={
            <NoteDetailsPage
              notes={notes}
              onDelete={deleteNote}
            />
          }
        />

        <Route
          path="notes/:id/edit"
          element={
            <EditNotePage
              notes={notes}
              onUpdate={updateNote}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}