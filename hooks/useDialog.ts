import { MouseEventHandler, useEffect, useRef, useState } from "react"

const useDialog = () => {
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

  return {
    dialogRef,
    handleClickBackdrop,
    setDialogOpen,
    dialogOpen,
  }
}

export default useDialog
