import useQuizAnswers from "../hooks/useQuiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import s from "./QuizDialog.module.scss"
import crossIcon from "./cross.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import useDialog from "../hooks/useDialog"
import SectionList from "./SectionList"

interface Props {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { quizAnswers, quizStarted } = useQuizAnswers()

  const { query } = useRouter()
  const { quiz_section } = query

  const { dialogOpen, dialogRef, handleClickBackdrop, setDialogOpen } =
    useDialog()

  return (
    <>
      {JSON.stringify(quizAnswers)}

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
          <button
            onClick={() => setDialogOpen(false)}
            className={s.closeButton}
          >
            <Image src={crossIcon} alt="" height={20} width={20} />
            <span className="visually-hidden">Close</span>
          </button>

          {quiz_section ? (
            <QuizSection
              section={quiz.sections[parseInt(quiz_section as string)]}
            />
          ) : (
            <SectionList sections={quiz.sections} />
          )}
        </div>
      </dialog>
    </>
  )
}

export default QuizDialog
