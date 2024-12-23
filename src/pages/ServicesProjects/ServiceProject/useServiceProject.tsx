import { useFormik } from "formik"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import * as yup from "yup"
import useApi from "../../../api/api-service/useApiService"
import { Option } from "../../../components/Dropdown/Dropdown"
import { FileType } from "../../../components/FileUpload/FileUpload"
import useSnackbar from "../../../snackbar/useSnackbar"
import {
  onChangeType,
  ServiceProject,
  ServiceProjectPayload
} from "../../../types/types"

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
    get: getCategories,
    data: getCategoriesData,
    isSuccess: getCategoriesIsSuccess
  } = useApi<ServiceProject[]>("/service-categories")

  const {
    put,
    post,
    isSuccess: isSuccessPostPut,
    error: errorPostPut,
    isError: isErrorPostPut,
    isLoading
  } = useApi<ServiceProject, ServiceProjectPayload>(
    `/${type}${serviceProjectId ? `/${serviceProjectId}` : ""}`
  )

  const [formId, setFormId] = useState(generateFormId())

  const initialValues = useMemo(
    (): ServiceProjectPayload => ({
      img1: undefined,
      img2: undefined,
      img3: undefined,
      img4: undefined,
      img5: undefined,
      paragraphs: [],
      title: "",
      category: undefined,
      architect: undefined,
      status: undefined
    }),
    []
  )

  const onSubmitFormik = (values: ServiceProjectPayload) => {
    const _values = {
      ...values,
      img1: isFileType(values.img1) ? values.img1 : undefined,
      img2: isFileType(values.img2) ? values.img2 : undefined,
      img3: isFileType(values.img3) ? values.img3 : undefined,
      img4: isFileType(values.img4) ? values.img4 : undefined,
      img5: isFileType(values.img5) ? values.img5 : undefined
    }
    serviceProjectId ? put(_values) : post(_values)
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
        paragraphs: yup
          .array()
          .of(yup.string().required("Paragraph is required")),
        img1: yup
          .mixed()
          .test("is-string-or-object", "Image is required", (value) => {
            return typeof value === "string" || isFileType(value)
          }),
        img2: yup
          .mixed()
          .test("is-string-or-object", "Image is required", (value) => {
            return (
              typeof value === "string" ||
              isFileType(value) ||
              value === undefined
            )
          }),
        img3: yup
          .mixed()
          .test("is-string-or-object", "Image is required", (value) => {
            return (
              typeof value === "string" ||
              isFileType(value) ||
              value === undefined
            )
          }),
        img4: yup
          .mixed()
          .test("is-string-or-object", "Image is required", (value) => {
            return (
              typeof value === "string" ||
              isFileType(value) ||
              value === undefined
            )
          }),
        img5: yup
          .mixed()
          .test("is-string-or-object", "Image is required", (value) => {
            return (
              typeof value === "string" ||
              isFileType(value) ||
              value === undefined
            )
          }),
        title: yup.string().required("Title is required"),
        architect: yup
          .string()
          .test(
            "is-required",
            "Architect is required",
            (value) => type !== "project" || value !== undefined
          )
          .notRequired(),
        status: yup
          .string()
          .test(
            "is-required",
            "Status is required",
            (value) => type !== "project" || value !== undefined
          )
          .notRequired(),
        category:
          type === "service"
            ? yup.string().required("Category is required")
            : yup.string().notRequired()
      }),
    [type]
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
  const onChangeImg = useCallback(
    ({ name, value }: onChangeType<FileType>) => {
      formik.setFieldValue(name, value)
    },
    [formik]
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formik.submitForm()
  }

  const removeImg =
    (imgField: "img1" | "img2" | "img3" | "img4" | "img5") => () => {
      formik.setFieldValue(imgField, undefined)
    }

  const serviceCategoriesOptions = useMemo(
    (): Option[] =>
      getCategoriesIsSuccess
        ? getCategoriesData?.map(({ _id, title }) => ({
            label: title,
            value: _id
          }))
        : [],
    [getCategoriesIsSuccess, getCategoriesData]
  )

  const onChangeCategory = useCallback(
    ({ name, value }: onChangeType<Option>) => {
      formik.setFieldValue(name, value.value)
    },
    [formik]
  )

  useEffect(() => {
    if (getIsSuccess && getData) {
      const {
        img1,
        img2,
        img3,
        img4,
        img5,
        paragraphs,
        title,
        category,
        architect,
        status
      } = getData
      formik
        .setValues({
          img1,
          img2,
          img3,
          img4,
          img5,
          paragraphs,
          title,
          category,
          architect,
          status
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

  useEffect(() => {
    type === "service" && getCategories()
  }, [])

  return {
    formId,
    formik,
    addParagraph,
    onChangeString,
    onSubmit,
    removeParagraph,
    onChangeImg,
    removeImg,
    isLoading,
    serviceCategoriesOptions,
    onChangeCategory
  }
}

export default useServiceProject
