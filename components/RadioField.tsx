import { useFormContext } from "react-hook-form"
import s from "./RadioField.module.scss"

interface Props {
  label: string
  name: string
  options: {
    [key: string]: string
  }
}

const RadioField = ({ label, options, name }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  return (
    <fieldset className={s.fieldset}>
      <legend>{label}</legend>

      {error && <p className={s.error}>{error?.toString()}</p>}

      <div className={s.fields}>
        {Object.entries(options).map(([label, value]) => (
          <div key={`${name}-${value}`} className={s.radioField}>
            <input
              type="radio"
              value={value}
              id={`${name}-${value}`}
              {...register(name)}
            />
            <label htmlFor={`${name}-${value}`}>{value}</label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default RadioField
