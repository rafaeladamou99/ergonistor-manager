import { useEffect } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import Content from "../pages/Content/Content/Content"
import Contents from "../pages/Content/Contents"
import Error from "../pages/Error/Error"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import ServiceProject from "../pages/ServicesProjects/ServiceProject/ServiceProject"
import ServicesProjects from "../pages/ServicesProjects/ServicesProjects"
import InverseProtectedRoute from "./InverseProtectedRoute"
import ProtectedRoute from "./ProtectedRoute"
import Root from "./Root"
import { Routes } from "./Routes"

const AppRouter = () => {
  const {
    dispatch,
    state: { access_token }
  } = useAuth()

  useEffect(() => {
    if (localStorage.access_token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: "Raf",
          access_token: localStorage.access_token
        }
      })
    }
  }, [localStorage?.access_token])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root hasToken={!!access_token} />,
      errorElement: <Error />,
      children: [
        {
          element: <InverseProtectedRoute hasToken={!!access_token} />,
          children: [
            { path: Routes.Login.path, element: <Login /> },
            { path: Routes.Register.path, element: <Register /> }
          ]
        },
        {
          element: <ProtectedRoute hasToken={!!access_token} />,
          children: [
            {
              path: Routes.Contents.AddContent.path,
              element: <Content />
            },
            {
              path: Routes.Contents.EditContent.routerPath,
              element: <Content />
            },
            { path: Routes.Contents.path, element: <Contents /> },
            {
              path: Routes.Services.path,
              element: <ServicesProjects key="service" type="service" />
            },
            {
              path: Routes.Services.AddService.path,
              element: <ServiceProject key="service" type="service" />
            },
            {
              path: Routes.Services.EditService.routerPath,
              element: <ServiceProject key="service" type="service" />
            },
            {
              path: Routes.Projects.path,
              element: <ServicesProjects key="project" type="project" />
            },
            {
              path: Routes.Projects.AddProject.path,
              element: <ServiceProject key="project" type="project" />
            },
            {
              path: Routes.Projects.EditProject.routerPath,
              element: <ServiceProject key="project" type="project" />
            },
            {
              path: "/",
              element: <Navigate to={Routes.Contents.path} />
            }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default AppRouter
