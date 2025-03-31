import { FormikErrors, useFormik } from "formik"
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import * as yup from "yup"
import useApi from "../../../api/api-service/useApiService"
import useSnackbar from "../../../snackbar/useSnackbar"
import {
  ContentPayload,
  ContentResponse,
  onChangeType
} from "../../../types/types"
import { FileType } from "../../../components/FileUpload/FileUpload"

const useContent = () => {
  const navigate = useNavigate()
  const { setNotification } = useSnackbar()

  const generateFormId = () => `form-${uuidv4()}`

  const { contentId } = useParams<{ contentId?: string }>()
  const {
    get,
    data: getData,
    isSuccess: getIsSuccess
  } = useApi<ContentResponse>(`/content/all-contents/${contentId}`)

  const {
    put,
    post,
    isSuccess: isSuccessPostPut,
    error: errorPostPut,
    isError: isErrorPostPut
  } = useApi<ContentResponse, ContentPayload>(`/content`)

  const [formId, setFormId] = useState(generateFormId())
  const initialValues = useMemo(
    (): ContentPayload => ({
      content: {
        copyrightMsg: "",
        home: {
          title: "",
          subtitle: "",
          msg: "",
          msg2: ""
        },
        about: {
          title: "",
          msg: "",
          key_people: [],
          sections: []
        },
        contact: {
          email: {
            msg: "",
            value: ""
          },
          msg: "",
          telephone: {
            msg: "",
            value: ""
          },
          linkedin: {
            msg: "",
            value: ""
          },
          title: ""
        },
        faq: {
          msg: "",
          title: "",
          questions: []
        },
        projects: {
          title: "",
          subtitle: "",
          msg: ""
        },
        services: {
          title: "",
          subtitle: "",
          msg: ""
        }
      },
      content_title: "",
      is_primary: false
    }),
    []
  )

  const onSubmitFormik = (values: ContentPayload) => {
    contentId ? put(values) : post(values)
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
        content: yup.object({
          copyrightMsg: yup.string().required("Copyright msg is required"),
          home: yup.object({
            title: yup.string().required("Title is required"),
            subtitle: yup.string().required("Subitle is required"),
            msg: yup.string().required("Message is required"),
            msg2: yup.string().required("Message is required"),
          }),
          about: yup.object({
            title: yup.string().required("Title is required"),
            msg: yup.string().required("Message is required"),
            key_people: yup.array().of(
              yup.object({
                name: yup.string().required("Name is required"),
                position: yup.string().required("Position is required"),
                img: yup
                  .mixed()
                  .test("is-string-or-object", "Image is required", (value) => {
                    return typeof value === "string" || isFileType(value)
                  })
              })
            ),
            sections: yup.array().of(
              yup.object({
                title: yup.string().required("Title is required"),
                paragraphs: yup
                  .array()
                  .of(yup.string().required("Paragraph is required"))
              })
            )
          }),
          contact: yup.object({
            email: yup.object({
              msg: yup.string().required("Email message is required"),
              value: yup.string().required("Email is required")
            }),
            msg: yup.string().required("Message is required"),
            telephone: yup.object({
              msg: yup.string().required("Telephone message is required"),
              value: yup.string().required("Telephone is required")
            }),
            linkedin: yup.object({
              msg: yup.string().required("Linkedin message is required"),
              value: yup.string().required("Linkedin is required")
            }),
            title: yup.string().required("Title is required")
          }),
          faq: yup.object({
            title: yup.string().required("Title is required"),
            msg: yup.string().required("Message is required"),
            questions: yup.array().of(
              yup.object({
                title: yup.string().required("Title is required"),
                paragraphs: yup
                  .array()
                  .of(yup.string().required("Paragraph is required"))
              })
            )
          }),
          projects: yup.object({
            title: yup.string().required("Title is required"),
            msg: yup.string().required("Message is required"),
            subtitle: yup.string().required("Subtitle is required")
          }),
          services: yup.object({
            title: yup.string().required("Title is required"),
            msg: yup.string().required("Message is required"),
            subtitle: yup.string().required("Subtitle is required")
          })
        }),
        content_title: yup.string().required("Content title is required"),
        is_primary: yup.boolean().required()
      }),
    []
  )

  const formik = useFormik<ContentPayload>({
    initialValues,
    onSubmit: onSubmitFormik,
    validationSchema
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formik.submitForm()
  }

  const hasTypeSections = (
    value:
      | string
      | string[]
      | FormikErrors<{
          title: string
          paragraphs: string[]
        }>[]
      | undefined
  ): value is FormikErrors<{
    title: string
    paragraphs: string[]
  }>[] =>
    typeof value !== "string" &&
    !(Array.isArray(value) && typeof value?.[0] === "string") &&
    value !== undefined

  const hasTypePeople = (
    value:
      | string
      | string[]
      | FormikErrors<{
          name: string
          position: string
          img: string
        }>[]
      | undefined
  ): value is FormikErrors<{
    name: string
    position: string
    img: string
  }>[] =>
    typeof value !== "string" &&
    !(Array.isArray(value) && typeof value?.[0] === "string") &&
    value !== undefined

  const removeSection = (index: number) => () => {
    const newSections = formik.values.content.about.sections.filter(
      (_, i) => i !== index
    )
    formik.setFieldValue("content.about.sections", newSections)
  }

  const removeParagraph = (index: number, pIndex: number) => () => {
    const newParagraphs = formik.values.content.about.sections?.[
      index
    ]?.paragraphs?.filter((_, i) => i !== pIndex)
    formik.setFieldValue(
      `content.about.sections[${index}].paragraphs`,
      newParagraphs
    )
  }

  const removePerson = (index: number) => () => {
    const newPeople = formik.values.content.about.key_people.filter(
      (_, i) => i !== index
    )
    formik.setFieldValue("content.about.key_people", newPeople)
  }

  const removeFaqQuestion = (index: number) => () => {
    const newFaqQuestions = formik.values.content.faq.questions.filter(
      (_, i) => i !== index
    )
    formik.setFieldValue("content.faq.questions", newFaqQuestions)
  }

  const removeFaqQuestionParagraph = (index: number, pIndex: number) => () => {
    const newParagraphs = formik.values.content.faq.questions?.[
      index
    ]?.paragraphs?.filter((_, i) => i !== pIndex)
    formik.setFieldValue(
      `content.faq.questions[${index}].paragraphs`,
      newParagraphs
    )
  }

  const addSection = () => {
    const newSections = [...formik.values.content.about.sections]
    newSections.push({
      title: "",
      paragraphs: []
    })
    formik.setFieldValue("content.about.sections", newSections)
  }

  const addSectionParagraph = (index: number) => () => {
    const newParagraphs = [
      ...formik.values.content.about.sections?.[index]?.paragraphs
    ]
    newParagraphs.push("")
    formik.setFieldValue(
      `content.about.sections[${index}].paragraphs`,
      newParagraphs
    )
  }

  const addPerson = () => {
    const newPeople = [...formik.values.content.about.key_people]
    newPeople.push({
      img: "",
      name: "",
      position: ""
    })
    formik.setFieldValue("content.about.key_people", newPeople)
  }

  const addFaqQuestion = () => {
    const newFaqQuestions = [...formik.values.content.faq.questions]
    newFaqQuestions.push({
      title: "",
      paragraphs: []
    })
    formik.setFieldValue("content.faq.questions", newFaqQuestions)
  }

  const addFaqQuestionParagraph = (index: number) => () => {
    const newParagraphs = [
      ...formik.values.content.faq.questions?.[index]?.paragraphs
    ]
    newParagraphs.push("")
    formik.setFieldValue(
      `content.faq.questions[${index}].paragraphs`,
      newParagraphs
    )
  }

  const onChangeImg = useCallback(
    ({ name, value }: onChangeType<FileType>) => {
      formik.setFieldValue(name, value)
    },
    [formik]
  )

  const removeImg = (imgField: string) => () => {
    formik.setFieldValue(imgField, undefined)
  }

  useEffect(() => {
    contentId && get()
  }, [contentId])

  const onChangeString = useCallback(
    ({ name, value }: onChangeType<string>) => {
      formik.setFieldValue(name, value)
    },
    [formik]
  )

  const onIsPrimaryChange = (
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    formik.setFieldValue("is_primary", checked)
  }

  useEffect(() => {
    if (getIsSuccess && getData) {
      const { about, contact, faq, home, projects, services, copyrightMsg } =
        getData.content
      formik
        .setValues({
          content: {
            about: {
              key_people: about.key_people.map(({ img, name, position }) => ({
                img,
                name,
                position
              })),
              msg: about.msg,
              sections: about.sections,
              title: about.title
            },
            contact: {
              title: contact.title,
              msg: contact.msg,
              email: {
                msg: contact.email.msg,
                value: contact.email.value
              },
              telephone: {
                msg: contact.telephone.msg,
                value: contact.telephone.value
              },
              linkedin: {
                msg: contact.linkedin?.msg ?? "",
                value: contact.linkedin?.value ?? ""
              }
            },
            faq: {
              title: faq.title,
              msg: faq.msg,
              questions: faq.questions.map((question) => ({
                title: question.title,
                paragraphs: question.paragraphs.map((paragraph) => paragraph)
              }))
            },
            home: {
              title: home.title,
              subtitle: home.subtitle,
              msg: home.msg,
              msg2: home.msg2
            },
            projects: {
              title: projects.title,
              subtitle: projects.subtitle,
              msg: projects.msg
            },
            services: {
              title: services.title,
              subtitle: services.subtitle,
              msg: services.msg
            },
            copyrightMsg: copyrightMsg ?? ""
          },
          content_title: getData.content_title,
          is_primary: getData.is_primary
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
          content: `Content successfully ${contentId ? "updated" : "created"}`,
          type: "success"
        }
      })
      navigate("/contents")
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

  return {
    onSubmit,
    formik,
    onChangeString,
    formId,
    hasTypeSections,
    hasTypePeople,
    removeFaqQuestion,
    removeFaqQuestionParagraph,
    removeParagraph,
    removePerson,
    removeSection,
    addFaqQuestion,
    addFaqQuestionParagraph,
    addPerson,
    addSection,
    addSectionParagraph,
    onIsPrimaryChange,
    isEdit: !!contentId,
    onChangeImg,
    removeImg
  }
}

export default useContent
