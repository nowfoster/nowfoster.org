import { values } from "faunadb"
import { ZodError } from "zod"

export interface Suggestion {
  title: string
  content: string
}

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
