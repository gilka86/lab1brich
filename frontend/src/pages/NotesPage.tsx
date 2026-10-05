import { Link } from 'react-router'
import { NoteCard } from '../components/NoteCard'
import { notes } from '../data/notes'

export function NotesPage() {
  return (
    <section>
      <h1>Мои заметки</h1>

      <Link to="/notes/new">Добавить заметку</Link>

      {notes.length === 0 ? (
        <p>Заметок пока нет.</p>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  )
}