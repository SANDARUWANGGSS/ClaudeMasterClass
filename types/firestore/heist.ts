import { FieldValue } from 'firebase/firestore'

export type HeistFinalStatus = 'success' | 'failure'

// Document — what you read from Firestore (after conversion)
export interface Heist {
  id: string
  title: string
  description: string
  createdBy: string
  createdByCodename: string
  assignedTo: string
  assignedToCodename: string
  deadline: Date
  finalStatus: HeistFinalStatus | null
  createdAt: Date
}

// Create Input — what you pass to addDoc
export interface CreateHeistInput {
  title: string
  description: string
  createdBy: string
  createdByCodename: string
  assignedTo: string
  assignedToCodename: string
  deadline: FieldValue  // Timestamp — 48 hours from creation
  finalStatus: null
  createdAt: FieldValue  // serverTimestamp()
}

// Update Input — partial fields for updateDoc
export interface UpdateHeistInput {
  title?: string
  description?: string
  assignedTo?: string
  assignedToCodename?: string
  deadline?: Date
  finalStatus?: HeistFinalStatus | null
}
