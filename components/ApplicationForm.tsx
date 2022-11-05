import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useQuiz } from "../contexts/quiz"
import { generateApplicationSchema } from "../lib/validators"
import {
  ApplicationInput,
  ContactPreference,
  EventResponseBody,
  LevelOfInterest,
  Quiz,
} from "../types"
import CallBookingField, { CallBookingFieldSkeleton } from "./CallBookingField"
import Field from "./Field"
import s from "./ApplicationForm.module.scss"
import { decodeAnswers } from "../lib/quiz"
import useSWR from "swr"
import LoaderButton from "./LoaderButton"
import RadioField from "./RadioField"

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

  const contactPref = methods.watch("contactPreference")

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
              label="Include my answers?"
              hint={
                watch("includeAnswers")
                  ? "A copy of your quiz answers will be included to support your application."
                  : "Your answers won't be shared."
              }
              name="includeAnswers"
              type="checkbox"
            />

            <RadioField
              name="contactPreference"
              label="How do you want to chat?"
              options={ContactPreference}
            />

            {contactPref === ContactPreference.Text && (
              <Field
                label="Mobile phone"
                name="phone"
                type="tel"
                hint="We'll text you on this number"
              />
            )}

            {contactPref === ContactPreference.Phone && (
              <Field
                label="Phone"
                name="phone"
                type="tel"
                hint="We'll call you on this number"
              />
            )}

            <RadioField
              name="levelOfInterest"
              label="How interested are you?"
              options={LevelOfInterest}
            />

            <Field label="Anything else to discuss?" name="discussionTopics" />
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

        <LoaderButton disabled={isSubmitting} loading={isSubmitting}>
          Apply
        </LoaderButton>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
