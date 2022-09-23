import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import useQuizAnswers from "../hooks/useQuiz"
import { applicationSchema } from "../lib/validators"
import { ApplicationInput } from "../types"
import Field from "./Field"

const ApplicationForm = () => {
  const methods = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: ApplicationInput) => {
    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(data),
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
          name="includeAnswers"
          type="checkbox"
        />

        <button disabled={isSubmitting}>Apply</button>
      </form>
    </FormProvider>
  )
}

export default ApplicationForm
