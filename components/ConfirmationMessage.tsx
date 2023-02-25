import s from "./ConfirmationMessage.module.scss"
import { useRouter } from "next/router"

const ConfirmationMessage = () => {
  const { query } = useRouter()

  if (query["application_confirmed"])
    return (
      <section className={s.applicationConfirmed}>
        <div className={s.inner}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="9"
              height="9"
              rx="4.5"
              fill="#164045"
              stroke="#164045"
            />
            <path
              d="M2.8125 5.09375L4.0625 6.40625L7.1875 3.125"
              strokeWidth="1.5"
            />
          </svg>

          <div>
            <h2>You&apos;ve booked your intro chat</h2>
            <p>
              Look out for a confirmation email in your inbox. If you have any questions, please reply to that email.
            </p>
          </div>
        </div>
      </section>
    )

  return null
}

export default ConfirmationMessage
