import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useQuiz } from "../contexts/quiz"
import { generateApplicationSchema } from "../lib/validators"
import { ApplicationInput, EventResponseBody, Quiz } from "../types"
import CallBookingField, { CallBookingFieldSkeleton } from "./CallBookingField"
import Field from "./Field"
import Button from "./Button"
import s from "./ApplicationForm.module.scss"
import { decodeAnswers } from "../lib/quiz"
import useSWR from "swr"

interface Props {
  quiz: Quiz
}

const ApplicationForm = ({ quiz }: Props) => {
  const { quizAnswers } = useQuiz()
  const { push } = useRouter()

  const { data: availability, error } = useSWR<EventResponseBody>("/api/slots")

  const [status, setStatus] = useState<string>("")

  const methods = useForm<ApplicationInput>({
    resolver: zodResolver(
      generateApplicationSchema(
        Array.isArray(availability) && availability?.length > 0
      )
    ),
    defaultValues: {
      includeAnswers: true,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, submitCount },
    watch,
  } = methods

  const onSubmit = async (data: ApplicationInput) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        answers: data.includeAnswers
          ? decodeAnswers(quizAnswers, quiz)
          : undefined, // take quiz answers if opted in
      }),
    })
    if (res.ok) {
      push("/?application_confirmed=true")
    } else {
      setStatus(
        "There was a problem sending your application. Please refresh the page and try again."
      )
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.grid}>
          <div className={s.fields}>
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
              hint={
                watch("includeAnswers")
                  ? "A copy of your quiz answers will be included to support your application."
                  : "Your answers won't be shared."
              }
              name="includeAnswers"
              type="checkbox"
            />

            <Field
              label="Is there anything in particular that you’d like to discuss? or remember to ask?"
              name="discussionTopics"
            />
          </div>

          <div className={s.appointmentSlots}>
            {availability || error ? (
              Array.isArray(availability) && availability?.length > 0 ? (
                <CallBookingField availability={availability} />
              ) : (
                <p className={s.noSlots}>
                  There are no calls available right now, but you can still send
                  an application and we&apos;ll get in touch when we can.
                </p>
              )
            ) : (
              <CallBookingFieldSkeleton />
            )}
          </div>
        </div>

        {!isValid && submitCount > 0 && (
          <p className={s.error}>There were some problems with your answers</p>
        )}

        {status && (
          <p role="alert" className={s.error}>
            {status}
          </p>
        )}

        <Button disabled={isSubmitting} loading={isSubmitting}>
          Apply
        </Button>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
