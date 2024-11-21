import { Navigate, Outlet } from "react-router-dom"
import { ProtectedRouteProps } from "./routes.types"

const ProtectedRoute = ({ hasToken }: ProtectedRouteProps) => {
  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
