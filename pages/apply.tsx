import useQuizAnswers from "../hooks/useQuiz"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { applicationSchema } from "../lib/validators"
import { Application } from "../types"
import ApplicationForm from "../components/ApplicationForm"

const ApplyPage = () => {
  return <ApplicationForm />
}

export default ApplyPage
