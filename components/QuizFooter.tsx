import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"

interface Props {
  totalSections: number
}

const QuizFooter = ({ totalSections }: Props) => {
  const { quizStarted, sectionsCompleted } = useQuiz()

  if (quizStarted)
    return (
      <footer>
        <>
          <meter
            id="completed-sections"
            value={sectionsCompleted}
            max={totalSections}
          />
          <label htmlFor="completed-sections">
            {sectionsCompleted} of {totalSections} completed
          </label>
        </>

        <Link href="/?quiz_open=true">Resume</Link>
      </footer>
    )

  return null
}

export default QuizFooter
