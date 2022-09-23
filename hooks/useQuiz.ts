import { Answers } from "../types"
import useLocalStorage from "./useLocalStorage"

const useQuizAnswers = () => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "fostering_quiz",
    {}
  )

  console.log(quizAnswers)

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

  const sectionsCompleted = Object.keys(quizAnswers).length

  return {
    quizAnswers,
    quizStarted: Object.keys(quizAnswers).length > 0,
    sectionsCompleted,
    startOver,
    answerQuestion,
  }
}

export default useQuizAnswers
