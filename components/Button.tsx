import Link from "next/link"
import s from "./Button.module.scss"

export const Icon = () => (
  <svg width="21" height="14" viewBox="0 0 21 14" fill="none">
    <path d="M0 7H19.3846" stroke="white" strokeWidth="2" />
    <path d="M13.3846 1L19.3846 7L13.3846 13" stroke="white" strokeWidth="2" />
  </svg>
)

//@ts-ignore
const Button = ({ children, ...props }) => (
  <button className={s.button} {...props}>
    {children}
    <Icon />
  </button>
)

export default Button
