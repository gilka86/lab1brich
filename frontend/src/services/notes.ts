
import { supabase } from '../lib/supabase'
import type { Note, NoteDraft } from '../types/note'

type NoteRow = {
  id: string
  owner_id: string
  category_id: string
  title: string
  description: string
  status: Note['status']
  created_date: string
  note_time: string | null
  priority: Note['priority']
  rating: number | null
  created_at: string
}

const noteColumns =
  'id, owner_id, category_id, title, description, status, created_date, note_time, priority, rating, created_at'

function fromRow(row: NoteRow): Note {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdDate: row.created_date,
    time: row.note_time ?? '',
    priority: row.priority,
    rating: row.rating === null ? '' : String(row.rating),
    category: row.category_id,
  }
}

function toWrite(draft: NoteDraft) {
  const rating = draft.rating.trim()

  return {
    category_id: draft.category,
    title: draft.title.trim(),
    description: draft.description.trim(),
    status: draft.status,
    created_date: draft.createdDate,
    note_time: draft.time || null,
    priority: draft.priority,
    rating: rating === '' ? null : Number(rating),
  }
}

export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select(noteColumns)
    .order('created_at', { ascending: false })
    .overrideTypes<NoteRow[], { merge: false }>()

  if (error) {
    throw new Error(
      `Не удалось загрузить заметки: ${error.message}`
    )
  }

  return data.map(fromRow)
}

export async function createNote(
  draft: NoteDraft
): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .insert(toWrite(draft))
    .select(noteColumns)
    .single()
    .overrideTypes<NoteRow, { merge: false }>()

  if (error) {
    throw new Error(
      `Не удалось создать заметку: ${error.message}`
    )
  }

  return fromRow(data)
}

export async function updateNote(
  id: string,
  draft: NoteDraft
): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .update(toWrite(draft))
    .eq('id', id)

  if (error) {
    throw new Error(
      `Не удалось изменить заметку: ${error.message}`
    )
  }
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(
      `Не удалось удалить заметку: ${error.message}`
    )
  }
}
