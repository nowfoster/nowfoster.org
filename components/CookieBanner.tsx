import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { consent } from "nextjs-google-analytics/dist/interactions/index"
import s from "./CookieBanner.module.scss"
import Link from "next/link"

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useLocalStorage(
    "show-cookie-banner",
    true
  )

  const [consentValue, setConsentValue] = useLocalStorage<"denied" | "granted">(
    "use-cookies",
    "denied"
  )

  useEffect(
    () =>
      consent({
        arg: "update",
        params: {
          ad_storage: consentValue,
          analytics_storage: consentValue,
        },
      }),
    [consentValue]
  )

  const handleAllow = () => {
    setShowBanner(false)
    setConsentValue("granted")
  }

  const handleDecline = () => {
    setShowBanner(false)
    setConsentValue("denied")
  }

  if (showBanner)
    return (
      <section className={s.cookies}>
        <div className={s.inner}>
          <p>
            We use <Link href="/privacy">cookies</Link> to improve your user
            experience.
          </p>
          <div>
            <button className="button" onClick={handleAllow}>
              Allow
            </button>
            <button className="button" onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
      </section>
    )

  return null
}

export default CookieBanner
