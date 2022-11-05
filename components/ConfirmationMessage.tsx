import s from "./ConfirmationMessage.module.scss"
import { useRouter } from "next/router"
import Link from "next/link"

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
              fill="black"
              stroke="black"
            />
            <path
              d="M2.8125 5.09375L4.0625 6.40625L7.1875 3.125"
              strokeWidth="1.5"
            />
          </svg>

          <div>
            <h2>We&apos;ve got your application</h2>
            <p>
              We&apos;ll be in touch soon. We&apos;ll be in touch soon.
              We&apos;ll be in touch soon. We&apos;ll be in touch soon.
              We&apos;ll be in touch soon.
            </p>
            <p>
              We&apos;ll send a copy of your answers to the email address you
              gave.
            </p>
            <Link href="/">Close message</Link>
          </div>
        </div>
      </section>
    )

  return null
}

export default ConfirmationMessage
