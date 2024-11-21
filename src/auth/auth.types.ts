import { ReactNode } from "react"

export interface AuthState {
  isAuthenticated: boolean
  user: any
  access_token: string | null
}

export type AuthAction =
  | {
      type: "LOGIN"
      payload: {
        user?: string
        access_token: string
      }
    }
  | {
      type: "LOGOUT"
    }
  | {
      type: "SET_USER"
      payload: {
        user: string
      }
    }

export interface AuthContextProps {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

export interface AuthProviderProps {
  children: ReactNode
}
