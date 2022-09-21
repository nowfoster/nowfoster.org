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
      <button>{activeQuestionIndex > 0 ? "Go back" : "Back to topics"}</button>

      <h2>{section.title}</h2>
      <div>{JSON.stringify(section.intro)}</div>

      <Question question={section.questions[activeQuestionIndex]} />

      <button>{lastQuestion ? "Finish" : "Next"}</button>
    </section>
  )
}

export default QuizSection
