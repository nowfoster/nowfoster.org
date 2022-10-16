import { useForm } from "react-hook-form"
import { useQuiz } from "../contexts/quiz"
import { Answer, Question, QuizSection } from "../types"
import Suggestion from "./Suggestion"
import s from "./Question.module.scss"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateQuestionSchema } from "../lib/validators"

interface Props {
  question: Question
  section: QuizSection
  children: React.ReactElement
}

interface FormValues {
  answer: Answer
}

const Question = ({ question, section, children }: Props) => {
  const { answerQuestion, quizAnswers } = useQuiz()

  const existingAnswer = quizAnswers?.[section.title]?.[question.question]

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      answer: existingAnswer ? existingAnswer : question.multiple ? [] : "",
    },
    resolver: zodResolver(generateQuestionSchema(question)),
  })

  const onSubmit = (data: FormValues) => {
    answerQuestion(section.title, question.question, data.answer)
  }

  const error = errors.answer?.message

  return (
    <div aria-live="polite" className={s.question}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}

        <p className={s.caption}>{section.title}</p>
        <legend className={s.legend}>{question.question}</legend>

        {error && (
          <p role="alert" className={s.error}>
            {error}
          </p>
        )}

        <fieldset className={s.fieldset}>
          {question.options.map((option, i) => (
            <div
              className={question.multiple ? s.checkboxField : s.radioField}
              key={`${i}-${option}`}
            >
              <input
                type={question.multiple ? "checkbox" : "radio"}
                value={option}
                id={`${i}-${option}`}
                {...register("answer")}
              />
              <label htmlFor={`${i}-${option}`}>{option}</label>
            </div>
          ))}
        </fieldset>

        <button className={s.button} disabled={isSubmitting}>
          Next
        </button>
      </form>

      {question.suggestion && <Suggestion suggestion={question.suggestion} />}
    </div>
  )
}

export default Question
