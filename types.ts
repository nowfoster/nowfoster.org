import { values } from "faunadb"

export interface Suggestion {
  title: string
  content: string
}

export interface Answers {
  [key: string]: {
    [key: string]: string
  }
}

export interface Quiz {
  sections: QuizSection[]
}

export interface QuizSection {
  id: string
  title: string
  intro: string
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  hint?: string
  options: Option[]
  multiple?: boolean
  suggestion?: Suggestion
}

export interface Option {
  label: string
  value: string
}

export interface Application {
  email: string
  firstName: string
  lastName: string
  answers?: unknown
}

export interface StoredApplication extends Application {
  createdAt: Date
}

export type ApiResponseBody =
  | values.Document<StoredApplication>
  | { error: string }
