import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import { useAuth } from "../auth/useAuth"
import { useEffect } from "react"

interface RootProps {
  hasToken: boolean
}

const Root = ({ hasToken }: RootProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isOnLoginPage = location.pathname === "/login"
  const {
    state: { access_token }
  } = useAuth()

  useEffect(() => {
    if (access_token && isOnLoginPage) {
      navigate("/")
    }
  }, [access_token, isOnLoginPage])

  return (
    <>
      {hasToken && <NavigationBar />}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root
