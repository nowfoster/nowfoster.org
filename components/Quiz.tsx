import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import s from "./Quiz.module.scss"
import SectionList from "./SectionList"
import { useState } from "react"

interface Props {
  quiz: Quiz
}

const Quiz = ({ quiz, ...props }: Props) => {
  const { completedSectionsCount } = useQuiz()
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  const activeSection = quiz.sections.find(
    section => section.id === activeSectionId
  )

  const totalSections = quiz.sections.length

  return (
    <>
      <meter
        className={s.meter}
        id="completed-sections"
        value={completedSectionsCount}
        max={totalSections}
      />

      <div className={s.inner}>
        {activeSection ? (
          <QuizSection
            section={activeSection}
            setActiveSectionId={setActiveSectionId}
          />
        ) : (
          <SectionList quiz={quiz} setActiveSectionId={setActiveSectionId} />
        )}
      </div>
    </>
  )

  return null
}

export default Quiz
