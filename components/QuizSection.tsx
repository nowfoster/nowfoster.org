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
  const isLastQuestion = activeQuestionIndex === section.questions.length - 1

  return (
    <section className={s.section}>
      {/* TODO: where do we show this stuff? */}
      {/* <h2>{section.title}</h2>
      {section.intro && <div>{documentToReactComponents(section.intro)}</div>} */}

      {question && (
        <Question question={question} section={section}>
          <button onClick={() => setActiveSectionId(null)} className={s.goBack}>
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
            Back to topics
          </button>
        </Question>
      )}
    </section>
  )
}

export default QuizSection
