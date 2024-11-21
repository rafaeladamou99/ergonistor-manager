import { useFormik } from "formik"
import { useCallback, useEffect, useMemo } from "react"
import * as yup from "yup"
import { onChangeType } from "../../types/types"
import { useNavigate } from "react-router-dom"
import useApi from "../../api/api-service/useApiService"
import useSnackbar from "../../snackbar/useSnackbar"
import { useAuth } from "../../auth/useAuth"
export interface LoginForm {
  email: string
  password: string
}
const useLogin = () => {
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const { setNotification } = useSnackbar()
  const { post, isLoading, isError, error, isSuccess, data } = useApi<
    { access_token: string; id: string; email: string },
    LoginForm
  >("/login")
  const initialValues = useMemo(
    (): LoginForm => ({
      email: "",
      password: ""
    }),
    []
  )
  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        password: yup.string().required("Password is required")
      }),
    []
  )

  const onSubmit = useCallback(
    (values: LoginForm) => {
      post(values)
    },
    [post]
  )

  const formik = useFormik<LoginForm>({
    initialValues,
    validationSchema,
    onSubmit
  })

  const onChangeString = useCallback(
    ({ name, value }: onChangeType<string>) => {
      formik.setFieldValue(name, value)
    },
    [formik]
  )

  const navigateToRegister = () => {
    navigate("/register")
  }

  useEffect(() => {
    if (isError && error) {
      setNotification({
        payload: {
          content: error,
          title: "Error",
          type: "error"
        },
        type: "OPEN"
      })
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess && data) {
      setNotification({
        payload: {
          content: "Successfully logged in",
          title: "Success",
          type: "success"
        },
        type: "OPEN"
      })
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.email,
          access_token: data.access_token
        }
      })
    }
  }, [isSuccess])

  return { onChangeString, formik, navigateToRegister }
}

export default useLogin
