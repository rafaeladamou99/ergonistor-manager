import { FormEvent } from "react"
import Button from "../../components/Button/Button"
import TextField from "../../components/TextField/TextField"
import useRegister from "./useRegister"

const Register = () => {
  const { onChangeString, formik, navigateToLogin } = useRegister()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formik.submitForm()
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <form
        className="w-[600px] max-md:w-full rounded-3xl bg-gray-100 p-6 flex flex-col gap-4 items-center"
        onSubmit={onSubmit}
      >
        <span className="text-2xl">Register</span>
        <TextField
          name="email"
          onChange={onChangeString}
          label="Email"
          hasError={!!formik.errors.email && formik.touched.email}
          errorMsg={formik.errors.email}
          debounceMs={0}
        />
        <TextField
          name="password"
          onChange={onChangeString}
          label="Password"
          hasError={!!formik.errors.password && formik.touched.password}
          errorMsg={formik.errors.password}
          type="password"
          debounceMs={0}
        />
        <TextField
          name="repeatPassword"
          onChange={onChangeString}
          label="Repeat Password"
          hasError={
            !!formik.errors.repeatPassword && formik.touched.repeatPassword
          }
          errorMsg={formik.errors.repeatPassword}
          type="password"
          debounceMs={0}
        />
        <Button label="Register" isSubmit />
        <Button
          label="Already have a user? Click here to login"
          onClick={navigateToLogin}
          type="tertiary"
        />
      </form>
    </div>
  )
}

export default Register
