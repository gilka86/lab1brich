
import { useNavigate } from 'react-router'
import { NoteForm } from '../components/NoteForm'
import type { NoteDraft } from '../types/note'

type NewNotePageProps = {
  onCreate: (draft: NoteDraft) => string
}

const emptyNote: NoteDraft = {
  title: '',
  description: '',
  status: 'active',
  createdDate: '',
  priority: 'medium',
  rating: 'string',
  time: '',
  category: '',
}

export function NewNotePage({ onCreate }: NewNotePageProps) {
  const navigate = useNavigate()

  function handleSave(draft: NoteDraft) {
    const id = onCreate(draft)
    navigate(`/notes/${id}`)
  }

  return (
    <section>
      <h1>Создание заметки</h1>

      <NoteForm
        initialValues={emptyNote}
        onSave={handleSave}
        onCancel={() => navigate('/notes')}
      />
    </section>
  )
}
