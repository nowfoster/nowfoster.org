import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useQuiz } from "../contexts/quiz"
import { applicationSchema } from "../lib/validators"
import { ApplicationInput } from "../types"
import Field from "./Field"

const ApplicationForm = () => {
  const { quizAnswers } = useQuiz()

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
        answers: data.includeAnswers ? quizAnswers : false, // take quiz answers if opted in
      }),
    })
    if (res.ok) alert("application sent ✅")
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

        <button disabled={isSubmitting}>Apply</button>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
