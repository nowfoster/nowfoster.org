import { z } from "zod"
import { Question } from "../types"

export const applicationSchema = z.object({
  email: z.string().email("That doesn't look like a valid email"),
  phone: z
    .string()
    .regex(
      /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,
      "That doesn't look like a valid phone number"
    ),
  firstName: z.string().min(2, {
    message: "First name must be at least two characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least two characters",
  }),
  includeAnswers: z.boolean(),
  eventId: z.string({
    required_error: "You must choose a time for a call",
    invalid_type_error: "You must choose a time for a call",
  }),
})

export const questionSchema = z.object({
  answer: z.string().min(1, { message: "You must choose an option" }),
})

export const generateQuizSchema = (questions: Question[]) => {
  const shape = questions.reduce<Record<string, any>>((shape, question, i) => {
    shape[question.id] = z
      .string({ invalid_type_error: "You must choose an option" })
      .min(1, { message: "You must choose an option" })
    return shape
  }, {})

  return z.object(shape)
}
