import Link from "next/link"
import { useState } from "react"
import {
  Answer,
  QuizSection,
  SectionAnswers,
  Suggestion as ISuggestion,
} from "../types"
import Question from "./Question"
import backIcon from "./back.svg"
import Image from "next/image"
import s from "./QuizSection.module.scss"
import { useForm, FormProvider } from "react-hook-form"
import { generateQuizSchema } from "../lib/validators"
import { useQuiz } from "../contexts/quiz"
import { zodResolver } from "@hookform/resolvers/zod"
import Suggestion from "./Suggestion"

interface Props {
  section: QuizSection
  setActiveSectionId: (id: string | null) => void
}

const QuizSection = ({ section, setActiveSectionId }: Props) => {
  const { quizAnswers, answerSection } = useQuiz()

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  const question = section.questions[activeQuestionIndex]
  const isFirstQuestion = activeQuestionIndex === 0
  const isLastQuestion = activeQuestionIndex === section.questions.length - 1

  const goBack = () =>
    isFirstQuestion
      ? setActiveSectionId(null)
      : setActiveQuestionIndex(activeQuestionIndex - 1)

  const [suggestion, setSuggestion] = useState<ISuggestion>({
    title: section.title,
    content: section.intro,
  })

  const formHelpers = useForm<SectionAnswers>({
    defaultValues: {
      ...quizAnswers[section.id],
    },
    resolver: zodResolver(generateQuizSchema(section.questions)),
  })

  const onSubmit = (answers: SectionAnswers) => {
    answerSection(section.id, answers)
    setActiveSectionId(null)
  }

  const nextQuestion = async () => {
    const valid = await formHelpers.trigger(question.id)
    if (valid) setActiveQuestionIndex(activeQuestionIndex + 1)
  }

  return (
    <section className={s.section}>
      <FormProvider {...formHelpers}>
        <div className={s.form}>
          <button onClick={goBack} className={s.goBack}>
            <svg
              width="15"
              height="20"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.95652 0.5L1.02433 2.47513L1 2.5L2.95652 4.5"
                stroke="black"
              />
            </svg>
            {isFirstQuestion ? "Back to topics" : "Go back"}
          </button>

          <form onSubmit={formHelpers.handleSubmit(onSubmit)}>
            <p className={s.caption}>
              Question {activeQuestionIndex + 1} of {section.questions.length}
            </p>

            {question && <Question question={question} />}

            {isLastQuestion && (
              <button
                className={s.button}
                disabled={formHelpers.formState.isSubmitting}
              >
                Finish
              </button>
            )}
          </form>

          {!isLastQuestion && (
            <button className={s.button} onClick={nextQuestion}>
              Next
            </button>
          )}
        </div>

        <Suggestion suggestion={suggestion} />
      </FormProvider>
    </section>
  )
}

export default QuizSection
