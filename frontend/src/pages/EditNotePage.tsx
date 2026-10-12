
import { Link, useNavigate, useParams } from 'react-router'
import { NoteForm } from '../components/NoteForm'
import type { Note, NoteDraft } from '../types/note'

type EditNotePageProps = {
  notes: Note[]
  onUpdate: (id: string, draft: NoteDraft) => void
}

export function EditNotePage({
  notes,
  onUpdate,
}: EditNotePageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const note = notes.find((item) => item.id === id)

  if (!note) {
    return (
      <section>
        <h1>Заметка не найдена</h1>
        <Link to="/notes">К списку заметок</Link>
      </section>
    )
  }

  const initialValues: NoteDraft = {
    title: note.title,
    description: note.description,
    status: note.status,
    createdDate: note.createdDate,
    priority: note.priority,
    category: note.category,
     rating: note.rating,
  time: note.time,
  }

  return (
    <section>
      <h1>Редактирование заметки</h1>

      <NoteForm
        key={note.id}
        initialValues={initialValues}
        onSave={(draft) => {
          onUpdate(note.id, draft)
          navigate(`/notes/${note.id}`)
        }}
        onCancel={() => navigate(`/notes/${note.id}`)}
      />
    </section>
  )
}
