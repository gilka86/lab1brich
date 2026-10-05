import { Link } from 'react-router'

export function NewNotePage() {
  return (
    <section>
      <h1>Создание заметки</h1>

      <p>
        Форма создания заметки появится в следующей лабораторной работе.
      </p>

      <Link to="/notes">К списку заметок</Link>
    </section>
  )
}