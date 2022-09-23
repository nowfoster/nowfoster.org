import { useForm } from "react-hook-form"
import useQuizAnswers from "../hooks/useQuiz"
import { Answer, Question, QuizSection } from "../types"
import Suggestion from "./Suggestion"
import s from "./Question.module.scss"

interface Props {
  question: Question
  section: QuizSection
}

interface FormValues {
  answer: Answer
}

const Question = ({ question, section }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      answer: question.multiple ? [] : "",
    },
  })

  const { answerQuestion } = useQuizAnswers()

  const onSubmit = (data: FormValues) => {
    answerQuestion(section.title, question.question, data.answer)
  }

  return (
    <div aria-live="polite" className={s.question}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={s.caption}>{section.title}</p>
        <legend className={s.legend}>{question.question}</legend>

        {JSON.stringify(getValues())}

        <fieldset className={s.fieldset}>
          {question.options.map((option, i) => (
            <div key={`${i}-${option}`}>
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

        <button disabled={isSubmitting}>Next</button>
      </form>

      {question.suggestion && <Suggestion suggestion={question.suggestion} />}
    </div>
  )
}

export default Question
