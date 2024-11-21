import { AuthAction, AuthState } from "./auth.types"

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  access_token: null
}

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("access_token", action.payload.access_token)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        access_token: action.payload.access_token
      }
    }
    case "LOGOUT": {
      localStorage.removeItem("access_token")
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        access_token: null
      }
    }
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
