import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useConfirmDialog } from "../contexts/confirmDialog"
import { useQuiz } from "../contexts/quiz"
import { applicationSchema } from "../lib/validators"
import { ApplicationInput, Event } from "../types"
import Field from "./Field"
import { DateTime } from "luxon"

interface Props {
  availability: Event[]
}

const ApplicationForm = ({ availability }: Props) => {
  const { quizAnswers } = useQuiz()
  const { push } = useRouter()
  const { triggerDialog } = useConfirmDialog()

  const methods = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      includeAnswers: true,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: ApplicationInput) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        answers: data.includeAnswers ? quizAnswers : undefined, // take quiz answers if opted in
      }),
    })
    if (res.ok) {
      triggerDialog() // open confirmation dialog
      push("/")
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="First name" name="firstName" />
        <Field label="Last name" name="lastName" />
        <Field
          label="Email"
          name="email"
          type="email"
          hint="We'll send a copy of your application to this address."
        />
        <Field label="Phone" name="phone" type="tel" />
        <Field
          label="Include my answers?"
          hint="Send us a copy of your quiz answers to support your application"
          name="includeAnswers"
          type="checkbox"
        />
        {/* TODO: replace with proper datepicker */}

        <fieldset>
          <legend>Book a call</legend>
          {availability.map(event => {
            const start = DateTime.fromISO(event.start?.dateTime)
            return (
              <div key={event.id}>
                <input
                  type="radio"
                  name="introCallBooked"
                  value={event.start?.dateTime || ""}
                  id={event.id || ""}
                />
                <label htmlFor={event.id || ""}>
                  {start.toLocaleString({
                    month: "short",
                    day: "numeric",
                    weekday: "short",
                  })}{" "}
                  at{" "}
                  {start.toLocaleString({
                    timeStyle: "short",
                  })}
                </label>
              </div>
            )
          })}
        </fieldset>

        <button disabled={isSubmitting}>Apply</button>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
