import { Dialog, DialogProps } from "@reach/dialog"
import { useState } from "react"
import useQuizAnswers from "../hooks/useQuiz"

const Quiz = (props: DialogProps) => {
  const { quizAnswers } = useQuizAnswers()

  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const quizStarted = Object.keys(quizAnswers).length > 0

  return (
    <>
      <button>{quizStarted ? "Resume" : "Could you foster?"}</button>

      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
        {...props}
      >
        test
      </Dialog>
    </>
  )
}

export default Quiz
