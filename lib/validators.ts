import { z } from "zod"

export const applicationSchema = z.object({
  email: z.string().email(),
  phone: z.string(),
  firstName: z.string().min(2, {
    message: "First name must be at least two characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least two characters",
  }),
})
