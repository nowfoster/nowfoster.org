import { Answers } from "../types"
import useLocalStorage from "./useLocalStorage"

const useQuizAnswers = () => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "fostering_quiz",
    {}
  )

  const answerQuestion = (
    section: string,
    question: string,
    answer: string | string[]
  ) =>
    setQuizAnswers({
      ...quizAnswers,
      [section]: {
        ...quizAnswers?.[section],
        [question]: answer,
      },
    })

  const startOver = () => setQuizAnswers({})

  return {
    quizAnswers,
    quizStarted: Object.keys(quizAnswers).length > 0,
    startOver,
    answerQuestion,
  }
}

export default useQuizAnswers
