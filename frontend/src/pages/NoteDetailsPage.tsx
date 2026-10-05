import { Link, useParams } from 'react-router'
import { notes } from '../data/notes'

export function NoteDetailsPage() {
  const { id } = useParams()

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
      <p>Дата: {note.createdDate}</p>
      <p>Статус: {note.status}</p>
      <p>Приоритет: {note.priority}</p>
      <p>Категория: {note.category}</p>

      <Link to="/notes">К списку заметок</Link>
    </section>
  )
}