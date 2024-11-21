import React, { createContext, Dispatch } from "react"
import { ISnackbarAction } from "./SnackbarReducer"

export interface ISnackbarContext {
  open: boolean
  title: string
  content: string
  type: "success" | "error"
}

const SnackbarContext = createContext<{
  notification: ISnackbarContext | null
  setNotification: Dispatch<ISnackbarAction>
}>({
  notification: null,
  setNotification: () => null
})

export default SnackbarContext
