import { useRouter } from "next/router"
import React, { createContext, useContext, useState, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { Answers, Quiz, SectionAnswers } from "../types"

interface ContextType {
  quizAnswers: Answers
  quizStarted: boolean
  completedSectionsCount: number
  getAllMandatorySectionsCompleted: (quiz: Quiz) => boolean
  startOver: () => void
  answerSection: (sectionId: string, answers: SectionAnswers) => void
  quizOpen: boolean
  openQuiz: () => void
  closeQuiz: () => void
}

const QuizAnswersContext = createContext<ContextType>({
  quizAnswers: {},
  quizStarted: false,
  completedSectionsCount: 0,
  getAllMandatorySectionsCompleted: () => false,
  startOver: () => null,
  answerSection: () => null,
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

  const answerSection = (sectionId: string, answers: SectionAnswers) => {
    setQuizAnswers({
      ...quizAnswers,
      [sectionId]: answers,
    })
  }

  const startOver = () => setQuizAnswers({})

  const completedSectionsCount = Object.keys(quizAnswers).length

  // check that the keys of all mandatory sections appear in the saved answers
  const getAllMandatorySectionsCompleted = (quiz: Quiz): boolean => {
    const mandatorySections = quiz.sections
      .filter(section => section.mandatorySection)
      .map(section => section.id)
    const completedSections = Object.keys(quizAnswers)
    return mandatorySections.every(id1 =>
      completedSections.find(id2 => id1 === id2)
    )
  }

  const quizStarted = Object.keys(quizAnswers).length > 0

  const { pathname } = useRouter()
  useEffect(() => setQuizOpen(false), [pathname])

  return (
    <QuizAnswersContext.Provider
      value={{
        quizStarted,
        quizAnswers,
        completedSectionsCount,
        getAllMandatorySectionsCompleted,
        startOver,
        answerSection,
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
