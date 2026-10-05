import { Link } from 'react-router'
import type { Note } from '../types/note'

type NoteCardProps = {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const statusLabels = {
    active: 'Активная',
    completed: 'Завершена',
    archived: 'В архиве',
  }

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  }

  return (
    <article className="note-card">
      <h2>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h2>

      <p>{note.description}</p>
      <p>Дата: {note.createdDate}</p>
      <p>Статус: {statusLabels[note.status]}</p>
      <p>Приоритет: {priorityLabels[note.priority]}</p>
    </article>
  )
}
