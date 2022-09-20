export interface Suggestion {}

export interface Question {
  question: string
  options: Option[]
  multiple?: boolean
}

export interface Option {
  label: string
  value: string
}

export interface Application {
  // id: string
  email: string
  firstName: string
  lastName: string
  createdAt: Date
}
