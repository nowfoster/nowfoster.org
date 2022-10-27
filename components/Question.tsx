import { useFormContext } from "react-hook-form"
import { Question } from "../types"
import s from "./Question.module.scss"

interface Props {
  question: Question
}

const Question = ({ question }: Props) => {
  const {
    formState: { errors },
    register,
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
          <div className={s.radioField} key={`${i}-${option.id}`}>
            <input
              type={"radio"}
              value={option.id}
              id={`${i}-${option.id}`}
              {...register(question.id)}
            />
            <label htmlFor={`${i}-${option.id}`}>{option.optionText}</label>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default Question
