import './App.css'

const appTitle: string = 'Не забудь, а то забудешь'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Простое приложение для заметок и напоминаний.</p>
      </header>

      <section aria-labelledby="items-title">
        <h2 id="items-title">Мои записи</h2>
        <p>Пока здесь пусто. Здесь позже появятся ваши заметки.</p>
      </section>
    </main>
  )
}