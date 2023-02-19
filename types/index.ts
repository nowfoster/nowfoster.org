import { values } from "faunadb"
import { calendar_v3 } from "googleapis"
import {
  IFosteringOption,
  IFosteringOptionFields,
  IFosteringStoriesFields,
  IQuestionFields,
  IQuizSectionFields,
  ISuggestionFields,
  ITeamMemberFields,
} from "./generated/contentful"

export interface Option extends ISuggestionFields {
  id: string
}

export type Suggestion = Omit<ISuggestionFields, "optionText">

export interface FosteringOption extends IFosteringOptionFields {
  id: string
}

export interface FosteringStory extends IFosteringStoriesFields {
  id: string
}

export interface TeamMember extends ITeamMemberFields {
  id: string
}

export interface Question extends Omit<IQuestionFields, "options"> {
  id: string
  options: Option[]
}

export interface QuizSection extends Omit<IQuizSectionFields, "questions"> {
  id: string
  questions: Question[]
}

export interface Quiz {
  sections: QuizSection[]
}

export type Answer = string | string[]

export interface SectionAnswers {
  [key: string]: Answer
}

export interface Answers {
  [key: string]: SectionAnswers
}

export enum ContactPreference {
  Video = "Video call",
  Phone = "Phone",
  Text = "Text message",
}

export enum LevelOfInterest {
  Starting = "Just starting to think about it",
  While = "Been thinking about it for a while",
  Definitely = "I definitely want to foster",
}

export interface Application {
  firstName: string
  lastName: string
  email: string
  phone: string
  includeAnswers: boolean
  answers?: Answers
  eventId: string // gcal event id
  createdAt: string
  // more qs
  contactPreference: ContactPreference
  levelOfInterest: LevelOfInterest
  discussionTopics: string
}

export type ApplicationInput = Omit<Application, "createdAt">

export type ApiResponseBody = values.Document<Application> | { error: string }

export type EventResponseBody = Event[] | { error: string }

export type Event = Pick<calendar_v3.Schema$Event, "id" | "end" | "start">
