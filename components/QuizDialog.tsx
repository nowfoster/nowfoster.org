import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import s from "./QuizDialog.module.scss"
import crossIcon from "./cross.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import useDialog from "../hooks/useDialog"
import SectionList from "./SectionList"
import Link from "next/link"
import { useState } from "react"

interface Props {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { dialogRef, handleClickBackdrop } = useDialog()
  const { quizOpen, closeQuiz } = useQuiz()
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  const activeSection = quiz.sections.find(
    section => section.id === activeSectionId
  )

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
            <SectionList
              sections={quiz.sections}
              setActiveSectionId={setActiveSectionId}
            />
          )}
        </div>
      </dialog>
    )

  return null
}

export default QuizDialog
