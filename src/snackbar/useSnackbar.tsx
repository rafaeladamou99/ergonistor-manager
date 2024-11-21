import { useContext } from "react"
import SnackbarContext from "./SnackbarContext"

const useSnackbar = () => {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error("useSnackbar must be used within an SnackbarProvider")
  }
  return context
}

export default useSnackbar
