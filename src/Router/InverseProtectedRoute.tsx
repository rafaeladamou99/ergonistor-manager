import { Navigate, Outlet } from "react-router-dom"
import { ProtectedRouteProps } from "./routes.types"

const InverseProtectedRoute = ({ hasToken }: ProtectedRouteProps) => {
  if (hasToken) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default InverseProtectedRoute
