import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import useQuizAnswers from "../hooks/useQuiz"
import { applicationSchema } from "../lib/validators"
import { Application } from "../types"

const ApplicationForm = () => {
  const { quizAnswers } = useQuizAnswers()
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<Application>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = (data: Application) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First name</label>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <label htmlFor="lastName">Last name</label>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <label htmlFor="email">Email address</label>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>

      <label htmlFor="include answers">Include my answers?</label>
      {/* <input type="checkbox" {...register("includeAnswers")} />
      <p>{errors.includeAnswers?.message}</p> */}

      <input type="submit" disabled={isSubmitting} />
    </form>
  )
}

export default ApplicationForm
