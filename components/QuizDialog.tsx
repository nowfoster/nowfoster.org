import { Dialog, DialogProps } from "@reach/dialog"
import { useState } from "react"
import useQuizAnswers from "../hooks/useQuiz"
import { Quiz } from "../types"
import QuizSection from "./QuizSection"
import QuizSectionList from "./QuizSectionList"
import "@reach/dialog/styles.css"

interface Props extends DialogProps {
  quiz: Quiz
}

const QuizDialog = ({ quiz, ...props }: Props) => {
  const { quizAnswers } = useQuizAnswers()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null
  )

  const quizStarted = Object.keys(quizAnswers).length > 0

  return (
    <>
      <button onClick={() => setDialogOpen(true)}>
        {quizStarted ? "Resume" : "Could you foster?"}
      </button>

      <Dialog
        aria-label="Quiz"
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
        {...props}
      >
        {/* {typeof activeSectionIndex === "number" ? (
          <QuizSection section={quiz.sections[activeSectionIndex]} />
        ) : (
          <QuizSectionList sections={quiz.sections} />
        )} */}
      </Dialog>
    </>
  )
}

export default QuizDialog
