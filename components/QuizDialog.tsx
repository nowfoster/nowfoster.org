import { MouseEventHandler, useEffect, useRef, useState } from "react"
import useQuizAnswers from "../hooks/useQuiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import QuizSectionList from "./QuizSectionList"
import s from "./QuizDialog.module.scss"
import useQueryState from "../hooks/useUrlQuery"

interface Props {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { quizAnswers, quizStarted } = useQuizAnswers()
  const [activeSectionIndex, setActiveSectionIndex] =
    useQueryState<number>("quiz_section")

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // keep dialog and react in sync
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog) dialogOpen && !dialog.open ? dialog.showModal() : dialog.close()
  }, [dialogOpen])

  // by default, html dialogs don't close when backdrop is clicked
  const handleClickBackdrop: MouseEventHandler<HTMLDialogElement> = e => {
    if (e.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <>
      <button onClick={() => setDialogOpen(true)}>
        {quizStarted ? "Resume" : "Could you foster?"}
      </button>

      <dialog
        ref={dialogRef}
        // eslint-disable-next-line react/no-unknown-property
        onClose={() => setDialogOpen(false)}
        onClick={handleClickBackdrop}
        className={s.dialog}
      >
        <div className={s.inner}>
          <button onClick={() => setDialogOpen(false)}>Close</button>

          {typeof activeSectionIndex === "number" ? (
            <QuizSection section={quiz.sections[activeSectionIndex]} />
          ) : (
            <QuizSectionList sections={quiz.sections} />
          )}
        </div>
      </dialog>
    </>
  )
}

export default QuizDialog
