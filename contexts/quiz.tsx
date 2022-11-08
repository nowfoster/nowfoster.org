import { useRouter } from "next/router"
import React, { createContext, useContext, useState, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { Answers, Quiz, SectionAnswers } from "../types"

interface ContextType {
  quizAnswers: Answers
  quizStarted: boolean
  completedAnswersCount: number
  startOver: () => void
  answerQuestion: (sectionId: string, answer: SectionAnswers) => void
  lastVisitedPage: string
  setLastVisitedPage: (path: string) => void
}

const QuizAnswersContext = createContext<ContextType>({
  quizAnswers: {},
  quizStarted: false,
  completedAnswersCount: 0,
  startOver: () => null,
  answerQuestion: () => null,
  lastVisitedPage: "",
  setLastVisitedPage: () => null,
})

export const QuizAnswersProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [quizAnswers, setQuizAnswers] = useLocalStorage<Answers>(
    "quiz_answers",
    {}
  )
  const [lastVisitedPage, setLastVisitedPage] = useLocalStorage<string>(
    "last_visited_page",
    "/could-you-foster/0"
  )

  const answerQuestion = (sectionId: string, answer: SectionAnswers) => {
    setQuizAnswers({
      ...quizAnswers,
      [sectionId]: {
        ...quizAnswers[sectionId],
        ...answer,
      },
    })
  }

  const startOver = () => setQuizAnswers({})

  const completedAnswersCount = Object.entries(quizAnswers).reduce(
    (total, [, sectionAnswers]) => total + Object.keys(sectionAnswers).length,
    0
  )

  const quizStarted = Object.keys(quizAnswers).length > 0

  return (
    <QuizAnswersContext.Provider
      value={{
        quizStarted,
        quizAnswers,
        completedAnswersCount,
        startOver,
        answerQuestion,
        lastVisitedPage,
        setLastVisitedPage,
      }}
    >
      {children}
    </QuizAnswersContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizAnswersContext)
