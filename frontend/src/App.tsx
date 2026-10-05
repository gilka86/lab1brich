import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { NotesPage } from './pages/NotesPage'
import { NoteDetailsPage } from './pages/NoteDetailsPage'
import { NewNotePage } from './pages/NewNotePage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/notes" replace />} />

        <Route path="notes" element={<NotesPage />} />

        <Route path="notes/new" element={<NewNotePage />} />

        <Route path="notes/:id" element={<NoteDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}