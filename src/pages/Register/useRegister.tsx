import { useFormik } from "formik"
import { useCallback, useMemo } from "react"
import * as yup from "yup"
import { onChangeType } from "../../types/types"
import { useNavigate } from "react-router-dom"
export interface RegisterForm {
  email: string
  password: string
  repeatPassword: string
}
const useRegister = () => {
  const navigate = useNavigate()
  const initialValues = useMemo(
    (): RegisterForm => ({
      email: "",
      password: "",
      repeatPassword: ""
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
        password: yup.string().required("Password is required"),
        repeatPassword: yup
          .string()
          .required("Password is required")
          .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value
          })
      }),
    []
  )

  const onSubmit = useCallback((values: RegisterForm) => {
    // call api
    console.log(values)
  }, [])

  const formik = useFormik<RegisterForm>({
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

  const navigateToLogin = () => {
    navigate("/login")
  }

  return { onChangeString, formik, navigateToLogin }
}

export default useRegister
