import React, { createContext, useContext, useState } from "react"
import ConfirmationDialog from "../components/ConfirmationDialog"

interface ContextType {
  // isOpen: boolean
  triggerDialog: () => void
  // closeDialog: () => void
}

const ConfirmDialogContext = createContext<ContextType>({
  // isOpen: false,
  triggerDialog: () => null,
  // closeDialog: () => null,
})

export const ConfirmDialogProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isOpen, setValue] = useState<boolean>(false)

  return (
    <ConfirmDialogContext.Provider
      value={{
        triggerDialog: () => setValue(true),
        // closeDialog: () => setValue(false),
      }}
    >
      <ConfirmationDialog isOpen={isOpen} closeDialog={() => setValue(false)} />
      {children}
    </ConfirmDialogContext.Provider>
  )
}

export const useConfirmDialog = () => useContext(ConfirmDialogContext)
