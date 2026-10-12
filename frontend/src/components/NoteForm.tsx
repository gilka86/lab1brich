
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { NoteDraft, NoteStatus } from '../types/note'

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

  
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const title = draft.title.trim()
  const description = draft.description.trim()

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
        <input
          id="note-category"
          type="text"
          value={draft.category}
          onChange={(e) =>
            setDraft({ ...draft, category: e.target.value })
          }
        />
      </div>

      {error && <p role="alert">{error}</p>}

      <button type="submit">Сохранить</button>
      <button type="button" onClick={props.onCancel}>
        Отмена
      </button>
    </form>
  )
}
