import { HTMLProps } from "react"
import { useFormContext } from "react-hook-form"
import s from "./Field.module.scss"

interface Props extends HTMLProps<HTMLInputElement> {
  label: string
  name: string
  hint?: string
}

const Field = ({ label, name, hint, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors?.[name]?.message

  return (
    <div className={s.field}>
      <label htmlFor={name}>{label}</label>
      {hint && <p className={s.hint}>{hint}</p>}
      {error && <p className={s.error}>{error?.toString()}</p>}
      <input {...register(name)} id={name} {...props} />
    </div>
  )
}

export default Field
