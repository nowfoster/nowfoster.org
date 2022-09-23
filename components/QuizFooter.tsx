import useQuizAnswers from "../hooks/useQuiz"
import { Quiz } from "../types"

interface Props {
  totalSections: number
}

const QuizFooter = ({ totalSections }: Props) => {
  const { quizStarted, sectionsCompleted } = useQuizAnswers()

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

        <button>Resume</button>
      </footer>
    )

  return null
}

export default QuizFooter
