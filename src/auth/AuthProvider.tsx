import { useReducer } from "react"
import { AuthProviderProps } from "./auth.types"
import { AuthContext } from "./AuthContext"
import { authReducer, initialState } from "./AuthReducer"

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
