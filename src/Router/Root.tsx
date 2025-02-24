import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import NavigationBar from "../components/NavigationBar/NavigationBar"
import { Routes } from "./Routes"

interface RootProps {
  hasToken: boolean
}

const Root = ({ hasToken }: RootProps) => {
  const navigate = useNavigate()
  const {
    state: { access_token }
  } = useAuth()

  useEffect(() => {
    if (access_token) {
      navigate(Routes.Contents.path)
    } else {
      navigate(Routes.Login.path)
    }
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
