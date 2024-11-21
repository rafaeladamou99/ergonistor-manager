import { ISnackbarContext } from "./SnackbarContext"

export const snackbarInitialState: ISnackbarContext = {
  content: "",
  open: false,
  title: "",
  type: "success"
}

export type ISnackbarAction =
  | {
      type: "OPEN"
      payload: Omit<ISnackbarContext, "open">
    }
  | {
      type: "CLOSE"
    }
export const snackbarRecucer = (
  state: ISnackbarContext,
  action: ISnackbarAction
): ISnackbarContext => {
  switch (action.type) {
    case "OPEN":
      return { ...state, ...action.payload, open: true }
    case "CLOSE":
      return { ...state, open: false }
    default:
      return { ...state }
  }
}
