import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import s from "./QuizFooter.module.scss"

interface Props {
  quiz: Quiz
}

const QuizFooter = ({ quiz }: Props) => {
  const { quizStarted, completedSectionsCount, openQuiz } = useQuiz()

  const totalSections = quiz.sections.length

  return (
    <footer className={s.footer}>
      <>
        <meter
          id="completed-sections"
          value={completedSectionsCount}
          max={totalSections}
        />
        <label htmlFor="completed-sections">
          {completedSectionsCount} of {totalSections} completed
        </label>
      </>

      <button className={s.button} onClick={openQuiz}>
        Resume
      </button>
    </footer>
  )

  return null
}

export default QuizFooter
