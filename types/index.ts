import { values } from "faunadb"
import {
  IQuestionFields,
  IQuizSectionFields,
  ISuggestionFields,
} from "./generated/contentful"

export interface Suggestion extends ISuggestionFields {
  id: string
}

export interface Question extends Omit<IQuestionFields, "suggestion"> {
  id: string
  suggestion?: Suggestion
}

export interface QuizSection extends Omit<IQuizSectionFields, "questions"> {
  id: string
  questions: Question[]
}

export interface Quiz {
  sections: QuizSection[]
}

export interface Answers {
  [key: string]: {
    [key: string]: string | string[]
  }
}

export interface Option {
  label: string
  value: string
}

export interface Application {
  firstName: string
  lastName: string
  email: string
  phone: string
  answers?: unknown
  // introEventBooked: string
  // attendedIntroEventAt: string
}

export interface StoredApplication extends Application {
  createdAt: string
}

export type ApiResponseBody =
  | values.Document<StoredApplication>
  | { error: string }
