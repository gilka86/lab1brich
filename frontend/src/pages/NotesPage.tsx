
import { useState } from 'react'
import { Link } from 'react-router'
import { NoteCard } from '../components/NoteCard'
import type { Note, NoteStatus } from '../types/note'

type NotesPageProps = {
  notes: Note[]
}

export function NotesPage({ notes }: NotesPageProps) {
  const [status, setStatus] = useState<NoteStatus | 'all'>('all')

  const visibleNotes = notes.filter(
    (note) => status === 'all' || note.status === status
  )

  return (
    <section>
      <h1>Мои заметки</h1>

      <p>
        <Link to="/notes/new">Добавить заметку</Link>
      </p>

      <div>
        <label htmlFor="status-filter">
          Фильтр по статусу:
        </label>

        <select
          id="status-filter"
          value={status}
          onChange={(event) => {
            const value = event.target.value

            if (
              value === 'all' ||
              value === 'active' ||
              value === 'completed' ||
              value === 'archived'
            ) {
              setStatus(value)
            }
          }}
        >
          <option value="all">Все заметки</option>
          <option value="active">Активные</option>
          <option value="completed">Завершённые</option>
          <option value="archived">В архиве</option>
        </select>

        <button
          type="button"
          onClick={() => setStatus('all')}
        >
          Сбросить фильтр
        </button>
      </div>

      <p>
        Показано заметок: {visibleNotes.length} из {notes.length}
      </p>

      {notes.length === 0 ? (
        <p>Заметок пока нет. Создайте первую заметку.</p>
      ) : visibleNotes.length === 0 ? (
        <p>По выбранному фильтру заметок не найдено.</p>
      ) : (
        <div className="note-list">
          {visibleNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  )
}
