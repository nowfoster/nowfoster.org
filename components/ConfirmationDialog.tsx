import useDialog from "../hooks/useDialog"

const ConfirmationDialog = () => {
  const { dialogOpen, dialogRef, handleClickBackdrop, setDialogOpen } =
    useDialog()

  return (
    <dialog
      ref={dialogRef}
      // eslint-disable-next-line react/no-unknown-property
      onClose={() => setDialogOpen(false)}
      onClick={handleClickBackdrop}
    >
      <h2>We&apos;ve got your application</h2>
      <p>We&apos;ll be in touch soon.</p>
    </dialog>
  )
}
