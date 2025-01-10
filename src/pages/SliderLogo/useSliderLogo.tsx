import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import useApi from "../../api/api-service/useApiService"
import { onChangeType, Slider, SliderPayload } from "../../types/types"
import useSnackbar from "../../snackbar/useSnackbar"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { FileType } from "../../components/FileUpload/FileUpload"
import * as yup from "yup"
import { useFormik } from "formik"

const useSliderLogo = () => {
  const [sliderId, setSliderId] = useState<string>("")
  const navigate = useNavigate()
  const { setNotification } = useSnackbar()

  const generateFormId = () => `form-${uuidv4()}`

  const {
    get,
    data: getData,
    isSuccess: getIsSuccess
  } = useApi<Slider[]>(`/slider`)

  const {
    put,
    post,
    isSuccess: isSuccessPostPut,
    error: errorPostPut,
    isError: isErrorPostPut,
    isLoading
  } = useApi<Slider, SliderPayload>(`/slider${sliderId ? `/${sliderId}` : ""}`)

  const [formId, setFormId] = useState(generateFormId())

  const initialValues = useMemo(
    (): SliderPayload => ({
      imgs: Array(15).fill(""),
      logo: undefined,
      msg: ""
    }),
    []
  )

  const onSubmitFormik = (values: SliderPayload) => {
    const _payload = {
      ...values,
      logo: typeof values.logo === "string" ? undefined : values.logo
    }
    sliderId ? put(_payload) : post(_payload)
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
        msg: yup.string().required("Paragraph is required"),
        imgs: yup.array().of(
          yup
            .mixed()
            .test("is-string-or-object", "Image is required", (value = "") => {
              return typeof value === "string" || isFileType(value)
            })
            .notRequired()
        ),
        logo: yup
          .mixed()
          .test("is-string-or-object", "Logo is required", (value) => {
            return typeof value === "string" || isFileType(value)
          })
      }),
    []
  )

  const formik = useFormik<SliderPayload>({
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

  const removeImg = (index: number) => () => {
    const updatedImgs = [...formik.values.imgs]
    updatedImgs[index] = ""
    formik.setFieldValue("imgs", updatedImgs)
  }

  const removeLogo = () => {
    formik.setFieldValue("logo", undefined)
  }

  useEffect(() => {
    if (getIsSuccess && getData.length) {
      const { _id, imgs, logo, msg } = getData[0]

      formik
        .setValues({
          imgs:
            imgs.length < 15
              ? imgs.concat(Array(15 - imgs.length).fill(""))
              : imgs,
          logo,
          msg
        })
        .then(() => {
          setFormId(generateFormId())
          setSliderId(_id)
        })
    }
  }, [getIsSuccess])

  useEffect(() => {
    if (isSuccessPostPut) {
      setNotification({
        type: "OPEN",
        payload: {
          title: "Success",
          content: `Slider successfully ${sliderId ? "updated" : "created"}`,
          type: "success"
        }
      })
      get()
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
    get()
  }, [])

  return {
    formId,
    formik,
    onChangeString,
    onSubmit,
    onChangeImg,
    removeImg,
    removeLogo,
    isLoading
  }
}

export default useSliderLogo
