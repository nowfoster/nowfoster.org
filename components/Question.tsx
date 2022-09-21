import { useForm } from "react-hook-form"
import useQuizAnswers from "../hooks/useQuiz"
import { Question, QuizSection } from "../types"
import Suggestion from "./Suggestion"

interface Props {
  question: Question
  section: QuizSection
}

const Question = ({ question, section }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const { answerQuestion } = useQuizAnswers()

  const onSubmit = data =>
    answerQuestion(section.title, question.question, data.answer)

  return (
    <div aria-live="polite">
      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>{question.question}</legend>

        <fieldset>
          {question.options.map(option => (
            <div key={option}>
              <input
                type={question.multiple ? "checkbox" : "radio"}
                value={option}
                id={option}
              />
              <label htmlFor={option}>{option}</label>
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
