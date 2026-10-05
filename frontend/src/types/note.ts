export type NoteStatus = 'active' | 'completed' | 'archived'

export type Note = {
  id: string
  title: string
  description: string
  status: NoteStatus
  createdDate: string
  priority: 'low' | 'medium' | 'high'
  category: string
}