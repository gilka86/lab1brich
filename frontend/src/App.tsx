import './App.css'

const appTitle: string = 'Не забудь, а то забудешь'

export default function App() {
  return (
    <main className="app">
      <header className="hero">
        <span className="hero__label">Мои заметки</span>

        <h1>{appTitle}</h1>

        <p className="hero__description">
          Простое приложение для хранения заметок и напоминаний,
          которое поможет не забыть важные дела.
        </p>
      </header>

      <section className="notes" aria-labelledby="notes-title">
        <div className="notes__heading">
          <div>
            <p className="notes__caption">Личное пространство</p>
            <h2 id="notes-title">Мои записи</h2>
          </div>

          <span className="notes__count">0 записей</span>
        </div>

        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            ✓
          </div>

          <h3>Здесь пока пусто</h3>

          <p>
            В следующих лабораторных работах здесь появятся ваши
            заметки, напоминания и сроки выполнения.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>Лабораторная работа №1 · React + TypeScript + Vite</p>
      </footer>
    </main>
  )
}