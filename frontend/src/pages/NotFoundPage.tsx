import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <h1>Страница не найдена</h1>

      <p>Такой страницы не существует.</p>

      <Link to="/notes">К списку заметок</Link>
    </section>
  )
}