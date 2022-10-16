import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import s from "./QuizFooter.module.scss"

interface Props {
  quiz: Quiz
}

const QuizFooter = ({ quiz }: Props) => {
  const { quizStarted, getSectionsCompleted, openQuiz } = useQuiz()

  const sectionsCompleted = getSectionsCompleted(quiz)
  const totalSections = quiz.sections.length

  return (
    <footer className={s.footer}>
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

      <button onClick={openQuiz}>Resume</button>
    </footer>
  )

  return null
}

export default QuizFooter
