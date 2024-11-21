import "./App.css"
import { AuthProvider } from "./auth/AuthProvider"
import AppRouter from "./Router/AppRouter"
import SnackbarProvider from "./snackbar/SnackbarProvider"

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
