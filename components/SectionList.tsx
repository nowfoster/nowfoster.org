import Link from "next/link"
import { useQuiz } from "../contexts/quiz"
import { Quiz, QuizSection } from "../types"
import s from "./SectionList.module.scss"

interface Props {
  quiz: Quiz
  setActiveSectionId: (id: string) => void
}

const SectionList = ({ quiz, setActiveSectionId }: Props) => {
  const { getAllMandatorySectionsCompleted, quizAnswers } = useQuiz()

  const allMandatorySectionsCompleted = getAllMandatorySectionsCompleted(quiz)

  return (
    <div className={s.sectionList}>
      <h2 className={s.headline}>Explore topics</h2>

      <p>You can answer questions in any order.</p>
      <p>
        Your answers are private unless you choose to share them with us when
        making an application.
      </p>

      {allMandatorySectionsCompleted && (
        <p>
          You&apos;ve completed all the required sections. You can now{" "}
          <Link href="/apply">apply</Link> if you like.
        </p>
      )}

      <ol className={s.list}>
        {quiz.sections
          .sort((a, b) => (a.order || 0) - (b.order || 0)) // respect sort order
          .map(section => {
            const thisSectionCompleted = Object.keys(quizAnswers).includes(
              section.id
            )

            return (
              <li key={section.id}>
                <button
                  className={s.sectionLink}
                  onClick={() => setActiveSectionId(section.id)}
                >
                  {section.title}
                  {thisSectionCompleted && <> ✅</>}
                </button>
              </li>
            )
          })}
      </ol>
    </div>
  )
}

export default SectionList
