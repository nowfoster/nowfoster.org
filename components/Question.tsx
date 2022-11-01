import { useFormContext } from "react-hook-form"
import { Question, Suggestion } from "../types"
import s from "./Question.module.scss"

interface Props {
  question: Question
  setSuggestion: (sugg: Suggestion) => void
}

const Question = ({ question, setSuggestion }: Props) => {
  const {
    formState: { errors },
    register,
    watch,
  } = useFormContext()

  const error = errors?.[question.id]?.message

  return (
    <div aria-live="polite" className={s.question}>
      <legend className={s.legend}>{question.question}</legend>

      {error && (
        <p role="alert" className={s.error}>
          {error.toString()}
        </p>
      )}

      <fieldset className={s.fieldset}>
        {question.options.map((option, i) => (
          <div
            className={
              question.selectMultipleOptions ? s.checkboxField : s.radioField
            }
            key={`${i}-${option.id}`}
          >
            <input
              type={question.selectMultipleOptions ? "checkbox" : "radio"}
              value={option.id}
              id={`${i}-${option.id}`}
              {...register(question.id)}
              onClick={e => setSuggestion(option)}
            />
            <label htmlFor={`${i}-${option.id}`}>{option.optionText}</label>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default Question
