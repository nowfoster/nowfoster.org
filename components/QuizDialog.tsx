import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import s from "./QuizDialog.module.scss"
import useDialog from "../hooks/useDialog"
import SectionList from "./SectionList"
import { useState } from "react"

interface Props {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { dialogRef, handleClickBackdrop } = useDialog()
  const { quizOpen, closeQuiz, completedSectionsCount } = useQuiz()
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  const activeSection = quiz.sections.find(
    section => section.id === activeSectionId
  )

  const totalSections = quiz.sections.length

  if (quizOpen)
    return (
      <dialog
        ref={dialogRef}
        // eslint-disable-next-line react/no-unknown-property
        onClose={closeQuiz}
        onClick={handleClickBackdrop}
        className={s.dialog}
        {...props}
      >
        <meter
          className={s.meter}
          id="completed-sections"
          value={completedSectionsCount}
          max={totalSections}
        />

        <div className={s.inner}>
          <button
            onClick={closeQuiz}
            className={activeSection ? s.closeButtonInverted : s.closeButton}
          >
            <svg width="20" height="20" viewBox="0 0 6 6">
              <path
                d="M0.121308 0.828445L0.828414 0.121338L5.77816 5.07109L5.07105 5.77819L0.121308 0.828445Z"
                fill="black"
              />
              <path
                d="M5.07105 0.121338L5.77816 0.828445L0.828414 5.77819L0.121307 5.07108L5.07105 0.121338Z"
                fill="black"
              />
            </svg>

            <span className="visually-hidden">Close</span>
          </button>

          {activeSection ? (
            <QuizSection
              section={activeSection}
              setActiveSectionId={setActiveSectionId}
            />
          ) : (
            <SectionList quiz={quiz} setActiveSectionId={setActiveSectionId} />
          )}
        </div>
      </dialog>
    )

  return null
}

export default QuizDialog
