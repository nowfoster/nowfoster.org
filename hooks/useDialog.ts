import { useRouter } from "next/router"
import { MouseEventHandler, useEffect, useRef } from "react"
import { useQuiz } from "../contexts/quiz"

const useDialog = () => {
  const { quizOpen: dialogOpen } = useQuiz()

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

  return {
    dialogRef,
    handleClickBackdrop,
    dialogOpen,
  }
}

export default useDialog
