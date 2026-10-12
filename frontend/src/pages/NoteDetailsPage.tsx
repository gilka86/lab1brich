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
    <section>
      <h1>{note.title}</h1>

      <p>{note.description}</p>
      <p>Дата: {note.createdDate}</p>
      <p>Рейтинг: {note.rating}</p>
      <p>Статус: {statusLabels[note.status]}</p>
      <p>Приоритет: {priorityLabels[note.priority]}</p>
      <p>Время : {note.time}</p>
      <p>Категория: {note.category}</p>

      <Link to="/notes">К списку заметок</Link>
    </section>
  )
}