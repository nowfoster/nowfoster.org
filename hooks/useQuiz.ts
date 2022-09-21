import { Answers } from "../types"
import useLocalStorage from "./useLocalStorage"

const useQuizAnswers = (): { quizAnswers: Answers } => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "fostering_quiz",
    {}
  )

  return {
    quizAnswers,
    // resetAll: () => setQuizAnswers({}),
    // TODO more utils
  }
}

export default useQuizAnswers
