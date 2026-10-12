
import { Link, useNavigate, useParams } from 'react-router'
import type { Note } from '../types/note'

type NoteDetailsPageProps = {
  notes: Note[]
  onDelete: (id: string) => void
}

export function NoteDetailsPage({
  notes,
  onDelete,
}: NoteDetailsPageProps) {
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

  return (
    <section>
      <h1>{note.title}</h1>

      <p>{note.description}</p>
      <p>Дата создания: {note.createdDate}</p>
      <p>Статус: {note.status}</p>
      <p>Приоритет: {note.priority}</p>
      <p>Категория: {note.category}</p>

      <p>
        <Link to={`/notes/${note.id}/edit`}>
          Редактировать
        </Link>
      </p>

      <button
        type="button"
        onClick={() => {
          if (window.confirm(`Удалить заметку «${note.title}»?`)) {
            onDelete(note.id)
            navigate('/notes', { replace: true })
          }
        }}
      >
        Удалить
      </button>

      <p>
        <Link to="/notes">К списку заметок</Link>
      </p>
    </section>
  )
}
