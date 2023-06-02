import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import { useQuiz } from "../contexts/quiz"
import { generateApplicationSchema } from "../lib/validators"
import {
  Answers,
  ApplicationInput,
  ContactPreference,
  EventResponseBody,
  LevelOfInterest,
  Quiz,
} from "../types"
import CallBookingField, { CallBookingFieldSkeleton } from "./CallBookingField"
import Field from "./Field"
import s from "./ApplicationForm.module.scss"
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
    resolver: yupResolver(
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
    formState: {
      isSubmitting,
      isValid,
      submitCount,
      errors,
      isSubmitSuccessful,
    },
    watch,
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
              hint="We'll send a confirmation email to this address"
            />
            <Field
              label="Phone number"
              name="optionalPhone"
              type="optionalPhone"
              hint="Optional"
            />
            <Field
              label="Include my answers?"
              hint={
                watch("includeAnswers")
                  ? "A copy of your answers will be sent to help shape our chat."
                  : "Your answers won't be shared."
              }
              name="includeAnswers"
              type="checkbox"
            />

            <RadioField
              name="contactPreference"
              label="How would you like to chat with us?"
              options={ContactPreference}
            />

            {contactPref === ContactPreference.Text && (
              <Field
                label="Confirm mobile number"
                name="phone"
                type="tel"
                hint="We'll text you on this number"
              />
            )}

            {contactPref === ContactPreference.Phone && (
              <Field
                label="Confirm phone number"
                name="phone"
                type="tel"
                hint="We'll call you on this number"
              />
            )}

            <RadioField
              name="levelOfInterest"
              label="What stage would you say you are at?"
              options={LevelOfInterest}
            />

            <Field
              label="Is there anything in particular that you’d like to discuss?"
              name="discussionTopics"
            />
          </div>

          <div className={s.appointmentSlots}>
            {availability || error ? (
              Array.isArray(availability) && availability?.length > 0 ? (
                <CallBookingField availability={availability} />
              ) : (
                <p className={s.noSlots}>
                  Oops, it looks like we&apos;re really busy at the moment.
                  Please complete the form and Laurie will be in touch as soon
                  as she can with the next available time slots.
                </p>
              )
            ) : (
              <CallBookingFieldSkeleton />
            )}
          </div>
        </div>

        {!isValid && submitCount > 0 && !isSubmitSuccessful && (
          <p className={s.error}>There were some problems with your answers</p>
        )}

        {status && (
          <p role="alert" className={s.error}>
            {status}
          </p>
        )}

        <LoaderButton disabled={isSubmitting} loading={isSubmitting}>
          Book chat
        </LoaderButton>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
