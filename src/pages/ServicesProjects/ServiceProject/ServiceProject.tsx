import React from "react"
import Button from "../../../components/Button/Button"
import TextField from "../../../components/TextField/TextField"
import useServiceProject from "./useServiceProject"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { ServicesProjectsProps } from "../ServicesProjects"

const ServiceProject = ({ type }: ServicesProjectsProps) => {
  const {
    onSubmit,
    formik,
    onChangeString,
    formId,
    removeParagraph,
    addParagraph
  } = useServiceProject(type)

  return (
    <div className="w-full h-full flex items-center justify-center md:p-10">
      <form
        className="w-full md:rounded-3xl bg-gray-100 p-6 flex flex-col gap-6 items-center"
        onSubmit={onSubmit}
        key={formId}
      >
        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="home"
        >
          <TextField
            name="title"
            onChange={onChangeString}
            label="Title"
            hasError={!!formik.errors.title && formik.touched.title}
            errorMsg={formik.errors.title}
            value={formik.values.title}
          />
          <TextField
            name="img"
            onChange={onChangeString}
            label="Image"
            hasError={!!formik.errors.img && formik.touched.img}
            errorMsg={formik.errors.img}
            value={formik.values.img}
          />
          {formik.values.paragraphs.map((paragraph, index) => (
            <div className="flex gap-2 items-center">
              <TextField
                name={`paragraphs[${index}]`}
                onChange={onChangeString}
                label={`Paragraph ${index + 1}`}
                hasError={
                  !!formik.errors.paragraphs?.[index] &&
                  formik.touched.paragraphs
                }
                errorMsg={formik.errors.paragraphs?.[index]}
                value={paragraph}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeParagraph(index)}
                className="cursor-pointer hover:text-red-700"
              />
            </div>
          ))}
          <Button label="Add Paragraph" onClick={addParagraph} />
        </div>
        <Button label="Save" isSubmit />
      </form>
    </div>
  )
}

export default ServiceProject
