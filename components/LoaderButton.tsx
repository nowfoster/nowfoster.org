import Link from "next/link"
import s from "./LoaderButton.module.scss"

export const Icon = () => (
  <svg width="21" height="14" viewBox="0 0 21 14" fill="none">
    <path d="M0 7H19.3846" stroke="white" strokeWidth="2" />
    <path d="M13.3846 1L19.3846 7L13.3846 13" stroke="white" strokeWidth="2" />
  </svg>
)

export const Spinner = () => (
  <svg
    width="142"
    height="142"
    viewBox="0 0 142 142"
    fill="none"
    className={s.spinner}
  >
    <g clipPath="url(#clip0_541_343)">
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71 142C110.212 142 142 110.212 142 71C142 31.7878 110.212 0 71 0C31.7878 0 0 31.7878 0 71C0 110.212 31.7878 142 71 142ZM71 112C93.6437 112 112 93.6437 112 71C112 48.3563 93.6437 30 71 30C48.3563 30 30 48.3563 30 71C30 93.6437 48.3563 112 71 112Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M194 -52H71V30C93.6437 30 112 48.3563 112 71H194V-52Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_541_343">
        <rect width="142" height="142" rx="71" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

//@ts-ignore
const LoaderButton = ({ children, loading, ...props }) => (
  <button className="quizButton" {...props}>
    {loading && <Spinner />}
    {children}
    <Icon />
  </button>
)

export default LoaderButton
