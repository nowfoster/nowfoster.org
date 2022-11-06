import { useRouter } from "next/router"
import { useEffect } from "react"
import { useQuiz } from "../../contexts/quiz"

const CouldYouFoster = () => {
  const { replace } = useRouter()
  const { lastVisitedPage } = useQuiz()

  useEffect(() => {
    if (window) {
      if (lastVisitedPage) {
        replace(lastVisitedPage)
      } else {
        replace("/could-you-foster/0")
      }
    }
  }, [replace, lastVisitedPage])

  return null
}

export default CouldYouFoster
