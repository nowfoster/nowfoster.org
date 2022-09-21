import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Link from "next/link"
import { useState } from "react"
import { QuizSection } from "../types"
import Question from "./Question"

interface Props {
  section: QuizSection
}

const QuizSection = ({ section }: Props) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  const lastQuestion = activeQuestionIndex === section.questions.length - 1

  return (
    <section>
      {/* <button>{activeQuestionIndex > 0 ? "Go back" : "Back to topics"}</button> */}

      <Link href="/">
        {activeQuestionIndex > 0 ? "Go back" : "Back to topics"}
      </Link>

      <h2>{section.title}</h2>
      {section.intro && <div>{documentToReactComponents(section.intro)}</div>}

      <Question
        question={section.questions[activeQuestionIndex]}
        section={section}
      />

      <button>{lastQuestion ? "Finish" : "Next"}</button>
    </section>
  )
}

export default QuizSection
