import { useFormik } from "formik"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import * as yup from "yup"
import useApi from "../../../api/api-service/useApiService"
import { FileType } from "../../../components/FileUpload/FileUpload"
import useSnackbar from "../../../snackbar/useSnackbar"
import {
  onChangeType,
  ServiceCategory,
  ServiceCategoryPayload
} from "../../../types/types"

const useServiceCategory = () => {
  const navigate = useNavigate()
  const { setNotification } = useSnackbar()

  const generateFormId = () => `form-${uuidv4()}`

  const { serviceCategoryId } = useParams<{
    serviceCategoryId: string
  }>()
  const {
    get,
    data: getData,
    isSuccess: getIsSuccess
  } = useApi<ServiceCategory>(`/service-categories/${serviceCategoryId}`)

  const {
    put,
    post,
    isSuccess: isSuccessPostPut,
    error: errorPostPut,
    isError: isErrorPostPut,
    isLoading
  } = useApi<ServiceCategory, ServiceCategoryPayload>(
    `/service-categories${serviceCategoryId ? `/${serviceCategoryId}` : ""}`
  )

  const [formId, setFormId] = useState(generateFormId())

  const initialValues = useMemo(
    (): ServiceCategoryPayload => ({
      title: ""
    }),
    []
  )

  const onSubmitFormik = (values: ServiceCategoryPayload) => {
    serviceCategoryId ? put(values) : post(values)
  }

  const isFileType = (
    value: FileType | string | undefined | any
  ): value is FileType =>
    !!(
      typeof value !== "string" &&
      value !== undefined &&
      typeof value.name === "string" &&
      Array.isArray(value.buffer) &&
      typeof value.buffer?.[0] === "number"
    )

  const validationSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required("Title is required")
      }),
    []
  )

  const formik = useFormik<ServiceCategoryPayload>({
    initialValues,
    onSubmit: onSubmitFormik,
    validationSchema
  })

  const onChangeString = useCallback(
    ({ name, value }: onChangeType<string>) => {
      formik.setFieldValue(name, value)
    },
    [formik]
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formik.submitForm()
  }

  useEffect(() => {
    if (getIsSuccess && getData) {
      const { title } = getData
      formik
        .setValues({
          title
        })
        .then(() => {
          setFormId(generateFormId())
        })
    }
  }, [getIsSuccess])

  useEffect(() => {
    if (isSuccessPostPut) {
      setNotification({
        type: "OPEN",
        payload: {
          title: "Success",
          content: `Service Category successfully ${
            serviceCategoryId ? "updated" : "created"
          }`,
          type: "success"
        }
      })
      navigate(`/service-categories`)
    }
  }, [isSuccessPostPut])

  useEffect(() => {
    if (isErrorPostPut && errorPostPut) {
      setNotification({
        type: "OPEN",
        payload: {
          title: "Error",
          content: errorPostPut,
          type: "error"
        }
      })
    }
  }, [isErrorPostPut])

  useEffect(() => {
    serviceCategoryId && get()
  }, [serviceCategoryId])

  return {
    formId,
    formik,
    onChangeString,
    onSubmit,
    isLoading
  }
}

export default useServiceCategory
