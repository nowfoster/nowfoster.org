import React, { createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { Answer, Answers, Quiz } from "../types"

interface ContextType {
  quizAnswers: Answers
  // setQuizAnswers: (newVal: Answers) => void
  quizStarted: boolean
  getSectionsCompleted: (quiz: Quiz) => number
  startOver: () => void
  answerQuestion: (
    section: string,
    question: string,
    answer: string | string[]
  ) => void
  quizOpen: boolean
  openQuiz: () => void
  closeQuiz: () => void
}

const QuizAnswersContext = createContext<ContextType>({
  quizAnswers: {},
  quizStarted: false,
  getSectionsCompleted: () => 0,
  startOver: () => null,
  answerQuestion: () => null,
  quizOpen: false,
  openQuiz: () => null,
  closeQuiz: () => null,
})

export const QuizAnswersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [quizOpen, setQuizOpen] = useState<boolean>(false)

  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "quiz_answers",
    {}
  )

  const answerQuestion = (
    section: string,
    question: string,
    answer: string | string[]
  ) => {
    setQuizAnswers({
      ...quizAnswers,
      [section]: {
        ...quizAnswers?.[section],
        [question]: answer,
      },
    })
  }

  const startOver = () => setQuizAnswers({})

  const getSectionsCompleted = (quiz: Quiz): number =>
    quiz.sections.reduce(
      (runningTotal, section) =>
        quizAnswers?.[section?.title] &&
        Object.keys(quizAnswers[section.title])?.length >=
          section.questions.length
          ? runningTotal + 1
          : runningTotal,
      0
    )

  const quizStarted = Object.keys(quizAnswers).length > 0

  return (
    <QuizAnswersContext.Provider
      value={{
        quizStarted,
        quizAnswers,
        getSectionsCompleted,
        startOver,
        answerQuestion,
        quizOpen,
        openQuiz: () => setQuizOpen(true),
        closeQuiz: () => setQuizOpen(false),
      }}
    >
      {children}
    </QuizAnswersContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizAnswersContext)
