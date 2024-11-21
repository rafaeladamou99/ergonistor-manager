import { Outlet } from "react-router-dom"
import NavigationBar from "../components/NavigationBar/NavigationBar"

interface RootProps {
  hasToken: boolean
}

const Root = ({ hasToken }: RootProps) => {
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
