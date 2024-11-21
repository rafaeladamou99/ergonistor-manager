import { ReactNode, useReducer } from "react"
import SnackbarContext from "./SnackbarContext"
import { snackbarInitialState, snackbarRecucer } from "./SnackbarReducer"
import { useSnackbar } from "@mui/base/useSnackbar"
import { ClickAwayListener, Snackbar } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export interface SnackbarProviderProps {
  children: ReactNode
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [notification, setNotification] = useReducer(
    snackbarRecucer,
    snackbarInitialState
  )

  const closeSnackbar = () => {
    setNotification({ type: "CLOSE" })
  }

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: closeSnackbar,
    open: notification.open,
    autoHideDuration: 5000
  })
  return (
    <SnackbarContext.Provider value={{ notification, setNotification }}>
      {notification.open && (
        <ClickAwayListener onClickAway={onClickAway}>
          <Snackbar
            {...getRootProps()}
            open
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <div
              className={`w-80 flex flex-col gap-4 items-center border rounded-xl p-4 ${
                notification.type === "success"
                  ? "border-green-500 bg-green-100"
                  : "border-red-500 bg-red-100"
              }`}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute right-4 hover:text-red-700 cursor-pointer text-xl"
                onClick={closeSnackbar}
              />
              <span className="text-xl font-medium">{notification.title}</span>
              <span className="text-base break-words max-w-full">
                {notification.content}
              </span>
            </div>
          </Snackbar>
        </ClickAwayListener>
      )}
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
