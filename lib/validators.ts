import { z } from "zod"
import { allowedPrefixes } from "../config"
import { Question } from "../types"

export const generateApplicationSchema = (eventsAvailable: boolean) => {
  const schema = z.object({
    email: z.string().email("That doesn't look like a valid email"),
    phone: z
      .string({
        required_error: "That doesn't look like a valid phone number",
      })
      .regex(
        /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
        "That doesn't look like a valid phone number"
      ),
    firstName: z.string().min(1, {
      message: "You need to give your first name",
    }),
    lastName: z.string().min(1, {
      message: "You need to give your last name",
    }),
    includeAnswers: z.boolean(),
    eventId: z.string({
      required_error: "You need to choose a time for a call",
      invalid_type_error: "You need to choose a time for a call",
    }),
    contactPreference: z.string({
      required_error: "You need to tell us how you'd prefer to be contacted",
      invalid_type_error:
        "You need to tell us how you'd prefer to be contacted",
    }),
    levelOfInterest: z.string({
      required_error: "You need to tell us how interested you are",
      invalid_type_error: "You need to tell us how interested you are",
    }),
    discussionTopics: z.string(),
  })

  return eventsAvailable ? schema : schema.omit({ eventId: true })
}

export const generateQuizSchema = (questions: Question[]) => {
  const shape = questions.reduce<Record<string, any>>((shape, question, i) => {
    if (question.questionType === "checkbox") {
      shape[question.id] = z.optional(z.array(z.string()))
    } else if (question.questionType === "explorer") {
      shape[question.id] = z
        .string({ invalid_type_error: "Explore some options to continue" })
        .min(1, { message: "Explore some options to continue" })
    } else {
      shape[question.id] = z
        .string({ invalid_type_error: "Choose an option to continue" })
        .min(1, { message: "Choose an option to continue" })
    }

    return shape
  }, {})

  return z.object(shape)
}

export const postcodeSchema = z.object({
  postcode: z
    .string()
    .regex(
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
      "That doesn't look like a valid postcode"
    )
    .refine(val => allowedPrefixes.find(prefix => val.startsWith(prefix)), {
      message: "You're not in our pilot area",
    }),
})
