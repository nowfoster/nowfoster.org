import { useQuiz } from "../contexts/quiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import s from "./QuizDialog.module.scss"
import crossIcon from "./cross.svg"
import Image from "next/image"
import { useRouter } from "next/router"
import useDialog from "../hooks/useDialog"
import SectionList from "./SectionList"
import useUrlQuery from "../hooks/useUrlQuery"
import Link from "next/link"

interface Props {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { quizStarted } = useQuiz()

  const { query, push } = useRouter()
  const { quiz_section } = query

  const { dialogRef, handleClickBackdrop } = useDialog()

  return (
    <>
      <Link href="/?quiz_open=true">
        {quizStarted ? "Resume" : "Could you foster?"}
      </Link>

      <dialog
        ref={dialogRef}
        // eslint-disable-next-line react/no-unknown-property
        onClose={() => push("/")}
        onClick={handleClickBackdrop}
        className={s.dialog}
      >
        <div className={s.inner}>
          <button onClick={() => push("/")} className={s.closeButton}>
            <Image src={crossIcon} alt="" height={20} width={20} />
            <span className="visually-hidden">Close</span>
          </button>

          {quiz_section ? (
            <QuizSection
              section={quiz.sections[Number(quiz_section as string)]}
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
