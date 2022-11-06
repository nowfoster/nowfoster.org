import { HTMLProps } from "react"
import { useFormContext } from "react-hook-form"
import s from "./Field.module.scss"

interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  name: string
  hint?: string
  big?: boolean
}

const Field = ({ big, label, name, hint, type, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  if (type === "checkbox")
    return (
      <div className={s.checkboxField}>
        <input {...register(name)} id={name} type={type} {...props} />
        <label htmlFor={name}>{label}</label>
        {hint && <p className={s.hint}>{hint}</p>}
        {error && <p className={s.error}>{error?.toString()}</p>}
      </div>
    )

  return (
    <div className={big ? s.bigField : s.field}>
      <label htmlFor={name}>{label}</label>
      {hint && <p className={s.hint}>{hint}</p>}
      {error && <p className={s.error}>{error?.toString()}</p>}
      <input {...register(name)} id={name} type={type} {...props} />
    </div>
  )
}

export default Field
