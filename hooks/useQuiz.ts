import { Answers } from "../types"
import useLocalStorage from "./useLocalStorage"

const useQuizAnswers = () => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "fostering_quiz",
    {}
  )

  return {
    quizAnswers,
    quizStarted: Object.keys(quizAnswers).length > 0,
    resetAll: () => setQuizAnswers({}),
    // TODO more utils
  }
}

export default useQuizAnswers
