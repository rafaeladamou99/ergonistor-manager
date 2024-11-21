import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import useSnackbar from "../../../snackbar/useSnackbar"
import { v4 as uuidv4 } from "uuid"
import useApi from "../../../api/api-service/useApiService"
import {
  onChangeType,
  ServiceProject,
  ServiceProjectPayload
} from "../../../types/types"
import * as yup from "yup"
import { useFormik } from "formik"

const useServiceProject = (type: "service" | "project") => {
  const navigate = useNavigate()
  const { setNotification } = useSnackbar()

  const generateFormId = () => `form-${uuidv4()}`

  const { serviceId, projectId } = useParams<{
    serviceId?: string
    projectId?: string
  }>()
  const serviceProjectId = type === "service" ? serviceId : projectId
  const {
    get,
    data: getData,
    isSuccess: getIsSuccess
  } = useApi<ServiceProject>(`/${type}/${serviceProjectId}`)

  const {
    put,
    post,
    isSuccess: isSuccessPostPut,
    error: errorPostPut,
    isError: isErrorPostPut
  } = useApi<ServiceProject, ServiceProjectPayload>(
    `/${type}${serviceProjectId ? `/${serviceProjectId}` : ""}`
  )

  const [formId, setFormId] = useState(generateFormId())

  const initialValues = useMemo(
    (): ServiceProjectPayload => ({
      img: "",
      paragraphs: [],
      title: ""
    }),
    []
  )

  const onSubmitFormik = (values: ServiceProjectPayload) => {
    serviceProjectId ? put(values) : post(values)
  }

  const validationSchema = useMemo(
    () =>
      yup.object({
        paragraphs: yup
          .array()
          .of(yup.string().required("Paragraph is required")),
        img: yup.string().required("Image is required"),
        title: yup.string().required("Title is required")
      }),
    []
  )

  const formik = useFormik<ServiceProjectPayload>({
    initialValues,
    onSubmit: onSubmitFormik,
    validationSchema
  })

  const addParagraph = () => {
    const newParagraphs = [...formik.values.paragraphs]
    newParagraphs.push("")
    formik.setFieldValue("paragraphs", newParagraphs)
  }

  const removeParagraph = (index: number) => () => {
    const newParagraphs = [...formik.values.paragraphs].filter(
      (_, i) => i !== index
    )
    formik.setFieldValue("paragraphs", newParagraphs)
  }

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
      const { img, paragraphs, title } = getData
      formik
        .setValues({
          img,
          paragraphs,
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
          content: `${type[0].toUpperCase()}${type.slice(1)} successfully ${
            serviceProjectId ? "updated" : "created"
          }`,
          type: "success"
        }
      })
      navigate(`/${type}s`)
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
    serviceProjectId && get()
  }, [serviceProjectId])

  return {
    formId,
    formik,
    addParagraph,
    onChangeString,
    onSubmit,
    removeParagraph
  }
}

export default useServiceProject
