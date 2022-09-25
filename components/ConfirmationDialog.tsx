import { useRouter } from "next/router"
import useDialog from "../hooks/useDialog"

const ConfirmationDialog = () => {
  const { dialogOpen, dialogRef, handleClickBackdrop } = useDialog()

  const {} = useRouter

  return (
    <dialog
      ref={dialogRef}
      // eslint-disable-next-line react/no-unknown-property
      onClose={() => null}
      onClick={handleClickBackdrop}
    >
      <h2>We&apos;ve got your application</h2>
      <p>We&apos;ll be in touch soon.</p>
    </dialog>
  )
}
