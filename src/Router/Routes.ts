export const Routes = {
  Services: {
    name: "Services",
    path: "/services",
    EditService: {
      name: "Service",
      path: (serviceId: number) => `/services/${serviceId}`,
      routerPath: "services/:serviceId"
    },
    AddService: {
      name: "Service",
      path: "/services/add"
    }
  },
  Projects: {
    name: "Projects",
    path: "/projects",
    EditProject: {
      name: "Project",
      path: (projectId: number) => `/projects/${projectId}`,
      routerPath: "projects/:projectId"
    },
    AddProject: {
      name: "Project",
      path: "/projects/add"
    }
  },
  Contents: {
    name: "Contents",
    path: "/contents",
    EditContent: {
      name: "Content",
      path: (contentId: string) => `/contents/${contentId}`,
      routerPath: "contents/:contentId"
    },
    AddContent: {
      name: "Content",
      path: "/contents/add"
    }
  },
  Login: {
    name: "Login",
    path: "/login"
  },
  Register: {
    name: "Register",
    path: "/register"
  }
}
