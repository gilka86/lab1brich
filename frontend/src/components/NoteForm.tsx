
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NoteDraft, NoteStatus } from '../types/note'
import { useCategories } from '../hooks/useCategories'

type NoteFormProps = {
  initialValues: NoteDraft
  onSave: (draft: NoteDraft) => void
  onCancel: () => void
}

export function NoteForm(props: NoteFormProps) {
  const [draft, setDraft] = useState<NoteDraft>(() => ({
    ...props.initialValues,
  }))
const [error, setError] = useState('')
  const { load, retry } = useCategories()

const categories = load.status === 'success' ? load.data : []

const selectedCategoryExists = categories.some(
  (category) => category.id === draft.category
)

const canSave = load.status === 'success' && selectedCategoryExists

  
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const title = draft.title.trim()
  const description = draft.description.trim()
if (!canSave) {
  setError('Дождитесь справочника и выберите доступную категорию.')
  return
}
  if (title.length < 3 || title.length > 100) {
    setError('Название должно содержать от 3 до 100 символов.')
    return
  }

  if (!draft.createdDate) {
    setError('Укажите дату создания заметки.')
    return
  }

  if (draft.status === 'completed' && description.length === 0) {
    setError('Завершённая заметка должна иметь описание.')
    return
  }

  setError('')

  props.onSave({
    ...draft,
    title,
    description,
  })
}


  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="note-title">Название</label>
        <input
          id="note-title"
          type="text"
          value={draft.title}
          required
          onChange={(e) =>
            setDraft({ ...draft, title: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="note-description">Описание</label>
        <textarea
          id="note-description"
          value={draft.description}
          onChange={(e) =>
            setDraft({ ...draft, description: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="note-date">Дата создания</label>
        <input
          id="note-date"
          type="date"
          value={draft.createdDate}
          required
          onChange={(e) =>
            setDraft({ ...draft, createdDate: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="note-status">Статус</label>
        <select
          id="note-status"
          value={draft.status}
          onChange={(e) => {
            const status = e.target.value

            if (
              status === 'active' ||
              status === 'completed' ||
              status === 'archived'
            ) {
              setDraft({
                ...draft,
                status: status as NoteStatus,
              })
            }
          }}
        >
          <option value="active">Активная</option>
          <option value="completed">Завершена</option>
          <option value="archived">В архиве</option>
        </select>
      </div>

      <div>
        <label htmlFor="note-priority">Приоритет</label>
        <select
          id="note-priority"
          value={draft.priority}
          onChange={(e) => {
            const priority = e.target.value

            if (
              priority === 'low' ||
              priority === 'medium' ||
              priority === 'high'
            ) {
              setDraft({ ...draft, priority })
            }
          }}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
      </div>

      
<div>
  <label htmlFor="note-category">Категория</label>

  <select
    id="note-category"
    value={draft.category}
    required
    disabled={load.status !== 'success' || categories.length === 0}
    onChange={(e) =>
      setDraft({
        ...draft,
        category: e.target.value,
      })
    }
  >
    <option value="">Выберите категорию</option>

    {draft.category !== '' && !selectedCategoryExists && (
      <option value={draft.category} disabled>
        Текущий код: {draft.category} — выберите доступную категорию
      </option>
    )}

    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</div>


{load.status === 'loading' && (
  <p role="status">Загружаем категории…</p>
)}

{load.status === 'error' && (
  <div>
    <p role="alert">{load.message}</p>
    <button type="button" onClick={retry}>
      Повторить
    </button>
  </div>
)}

{load.status === 'success' && categories.length === 0 && (
  <div>
    <p role="status">
      Категорий пока нет. Сохранение недоступно.
    </p>
    <button type="button" onClick={retry}>
      Повторить
    </button>
  </div>
)}

{load.status === 'success' &&
  categories.length > 0 &&
  draft.category !== '' &&
  !selectedCategoryExists && (
    <p role="alert">
      Выбранная категория недоступна. Выберите другую.
    </p>
  )}

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={!canSave}>
  Сохранить
</button>
      <button type="button" onClick={props.onCancel}>
        Отмена
      </button>
    </form>
  )
}
