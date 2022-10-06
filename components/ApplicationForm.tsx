import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useConfirmDialog } from "../contexts/confirmDialog"
import { useQuiz } from "../contexts/quiz"
import { applicationSchema } from "../lib/validators"
import { ApplicationInput, Event } from "../types"
import CallBookingField from "./CallBookingField"
import Field from "./Field"

const ApplicationForm = () => {
  const { quizAnswers } = useQuiz()
  const { push } = useRouter()
  const { triggerDialog } = useConfirmDialog()

  const [availability, setAvailability] = useState<Event[] | null>(null)

  useEffect(() => {
    fetch("/api/slots")
      .then(res => res.json())
      .then(data => setAvailability(data))
  }, [])

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
        <Field
          label="Phone"
          name="phone"
          type="tel"
          hint="We'll call you on this number"
        />
        <Field
          label="Include my answers?"
          hint="Send us a copy of your quiz answers to support your application"
          name="includeAnswers"
          type="checkbox"
        />

        {availability ? (
          availability.length > 0 ? (
            <CallBookingField availability={availability} />
          ) : (
            <p>
              There are no calls available right now, but you can still send an
              application and we&apos;ll get in touch when we can.
            </p>
          )
        ) : (
          <p>Loading...</p>
        )}

        <button disabled={isSubmitting}>Apply</button>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
