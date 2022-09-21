import { useState } from "react"
import { QuizSection } from "../types"

interface Props {
  section: QuizSection
}

const QuizSection = ({ section }: Props) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0)

  return <p>first question goes here</p>
}

export default QuizSection
