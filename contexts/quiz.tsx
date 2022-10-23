import React, { createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { Answer, Answers, Quiz } from "../types"

interface ContextType {
  quizAnswers: Answers
  // setQuizAnswers: (newVal: Answers) => void
  quizStarted: boolean
  completedSectionsCount: number
  getAllMandatorySectionsCompleted: (quiz: Quiz) => boolean
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
  completedSectionsCount: 0,
  getAllMandatorySectionsCompleted: () => false,
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

  return (
    <QuizAnswersContext.Provider
      value={{
        quizStarted,
        quizAnswers,
        completedSectionsCount,
        getAllMandatorySectionsCompleted,
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
