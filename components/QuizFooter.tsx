import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import s from "./QuizFooter.module.scss"

interface Props {
  quiz: Quiz
}

const QuizFooter = ({ quiz }: Props) => {
  const { quizStarted, getSectionsCompleted } = useQuiz()

  const sectionsCompleted = getSectionsCompleted(quiz)
  const totalSections = quiz.sections.length

  if (quizStarted)
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

        <Link href="/?quiz_open=true">Resume</Link>
      </footer>
    )

  return null
}

export default QuizFooter
