import { useRouter } from "next/router"
import { MouseEventHandler, useEffect, useRef } from "react"
import { useConfirmDialog } from "../contexts/confirmDialog"
import useDialog from "../hooks/useDialog"

interface Props {
  isOpen: boolean
  closeDialog: () => void
}

const ConfirmationDialog = ({ isOpen, closeDialog }: Props) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // keep dialog and react in sync
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog) isOpen && !dialog.open ? dialog.showModal() : dialog.close()
  }, [isOpen])

  // by default, html dialogs don't close when backdrop is clicked
  const handleClickBackdrop: MouseEventHandler<HTMLDialogElement> = e => {
    if (e.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      // eslint-disable-next-line react/no-unknown-property
      onClose={closeDialog}
      onClick={handleClickBackdrop}
    >
      <h2>We&apos;ve got your application</h2>
      <p>We&apos;ll be in touch soon.</p>
    </dialog>
  )
}

export default ConfirmationDialog
