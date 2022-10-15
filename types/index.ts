import { values } from "faunadb"
import { calendar_v3 } from "googleapis"
import {
  IFosteringOption,
  IFosteringOptionFields,
  IQuestionFields,
  IQuizSectionFields,
  ISuggestionFields,
} from "./generated/contentful"

export interface Suggestion extends ISuggestionFields {
  id: string
}

export interface FosteringOption extends IFosteringOptionFields {
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

export type Answer = string | string[]

export interface Answers {
  [key: string]: {
    [key: string]: Answer
  }
}

export interface Option {
  label: string
  value: string
}

export type ApplicationInput = Omit<Application, "createdAt">

export interface Application {
  firstName: string
  lastName: string
  email: string
  phone: string
  includeAnswers: boolean
  answers?: Answers
  eventId: string // gcal event id
  createdAt: string
}

export type ApiResponseBody = values.Document<Application> | { error: string }

export type EventResponseBody = Event[] | { error: string }

export type Event = Pick<calendar_v3.Schema$Event, "id" | "end" | "start">
