export type NoteStatus = 'active' | 'completed' | 'archived'

export type Note = {
  id: string
  title: string
  rating: string
  description: string
  status: NoteStatus
  createdDate: string
  time: string
  priority: 'low' | 'medium' | 'high'
  category: string
}