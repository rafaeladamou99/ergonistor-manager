import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import NavigationBar from "../components/NavigationBar/NavigationBar"

interface RootProps {
  hasToken: boolean
}

const Root = ({ hasToken }: RootProps) => {
  const navigate = useNavigate()
  const {
    state: { access_token }
  } = useAuth()

  useEffect(() => {
    navigate("/")
  }, [access_token])

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
