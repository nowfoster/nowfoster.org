import Link from "next/link"
import { useState } from "react"
import { QuizSection } from "../types"
import Question from "./Question"
import backIcon from "./back.svg"
import Image from "next/image"
import s from "./QuizSection.module.scss"

interface Props {
  section: QuizSection
  setActiveSectionId: (id: string | null) => void
}

const QuizSection = ({ section, setActiveSectionId }: Props) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  const question = section.questions[activeQuestionIndex]

  const isFirstQuestion = activeQuestionIndex === 0
  const isLastQuestion = activeQuestionIndex === section.questions.length - 1

  const nextQuestion = () => {
    if (!isLastQuestion) setActiveQuestionIndex(activeQuestionIndex + 1)
  }

  return (
    <section className={s.section}>
      {/* TODO: where do we show this stuff? */}
      {/* <h2>{section.title}</h2>
      {section.intro && <div>{documentToReactComponents(section.intro)}</div>} */}

      {question && (
        <Question
          question={question}
          section={section}
          nextQuestion={nextQuestion}
          isLastQuestion={isLastQuestion}
        >
          <button
            onClick={() =>
              isFirstQuestion
                ? setActiveSectionId(null)
                : setActiveQuestionIndex(activeQuestionIndex - 1)
            }
            className={s.goBack}
          >
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
        </Question>
      )}
    </section>
  )
}

export default QuizSection
