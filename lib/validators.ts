import { z } from "zod"
import { ApplicationInput } from "../types"

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
  introCallAt: z.string(),
})
