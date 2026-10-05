import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <p className="app-title">Мои заметки</p>

        <nav aria-label="Основная навигация">
          <NavLink to="/notes" end>
            Заметки
          </NavLink>

          <NavLink to="/notes/new">
            Создать
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}