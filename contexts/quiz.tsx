import React, { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { Answer, Answers } from "../types"

interface ContextType {
  quizAnswers: Answers
  // setQuizAnswers: (newVal: Answers) => void
  quizStarted: boolean
  sectionsCompleted: number
  startOver: () => void
  answerQuestion: (
    section: string,
    question: string,
    answer: string | string[]
  ) => void
}

const QuizAnswersContext = createContext<ContextType>({
  quizAnswers: {},
  quizStarted: false,
  sectionsCompleted: 0,
  startOver: () => null,
  answerQuestion: () => null,
})

export const QuizAnswersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage("quiz_answers", {})

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

  const quizStarted = Object.keys(quizAnswers).length > 0

  return (
    <QuizAnswersContext.Provider
      value={{
        quizStarted,
        quizAnswers,
        sectionsCompleted,
        startOver,
        answerQuestion,
      }}
    >
      {children}
    </QuizAnswersContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizAnswersContext)
