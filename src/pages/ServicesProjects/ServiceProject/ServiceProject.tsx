import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../../components/Button/Button"
import FileUpload from "../../../components/FileUpload/FileUpload"
import TextField from "../../../components/TextField/TextField"
import useServiceProject from "./useServiceProject"
import Dropdown from "../../../components/Dropdown/Dropdown"

export interface ServicesProjectProps {
  type: "service" | "project"
}

const ServiceProject = ({ type }: ServicesProjectProps) => {
  const {
    onSubmit,
    formik,
    onChangeString,
    formId,
    removeParagraph,
    addParagraph,
    onChangeImg,
    removeImg,
    isLoading,
    serviceCategoriesOptions,
    onChangeCategory
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
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Image"
              onChange={onChangeImg}
              name="img1"
              value={formik.values.img1}
              errorMsg={formik.errors.img1}
              hasError={!!formik.errors.img1}
            />
            {typeof formik.values.img1 === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg("img1")}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Image"
              onChange={onChangeImg}
              name="img2"
              value={formik.values.img2}
              errorMsg={formik.errors.img2}
              hasError={!!formik.errors.img2}
            />
            {typeof formik.values.img2 === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg("img2")}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Image"
              onChange={onChangeImg}
              name="img3"
              value={formik.values.img3}
              errorMsg={formik.errors.img3}
              hasError={!!formik.errors.img3}
            />
            {typeof formik.values.img3 === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg("img3")}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Image"
              onChange={onChangeImg}
              name="img4"
              value={formik.values.img4}
              errorMsg={formik.errors.img4}
              hasError={!!formik.errors.img4}
            />
            {typeof formik.values.img4 === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg("img4")}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Image"
              onChange={onChangeImg}
              name="img5"
              value={formik.values.img5}
              errorMsg={formik.errors.img5}
              hasError={!!formik.errors.img5}
            />
            {typeof formik.values.img5 === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg("img5")}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
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
          {!!serviceCategoriesOptions.length && (
            <Dropdown
              label="Category"
              name="category"
              onChange={onChangeCategory}
              options={serviceCategoriesOptions}
              value={serviceCategoriesOptions.find(
                (option) => option.value === formik.values.category
              )}
              errorMsg={formik.errors.category}
              hasError={!!formik.errors.category}
            />
          )}
          {type === "project" && (
            <>
              <TextField
                name="architect"
                onChange={onChangeString}
                label="Architect"
                hasError={!!formik.errors.architect && formik.touched.architect}
                errorMsg={formik.errors.architect}
                value={formik.values.architect}
              />
              <TextField
                name="status"
                onChange={onChangeString}
                label="Status"
                hasError={!!formik.errors.status && formik.touched.status}
                errorMsg={formik.errors.status}
                value={formik.values.status}
              />
            </>
          )}
        </div>
        <Button label="Save" isSubmit isLoading={isLoading} />
      </form>
    </div>
  )
}

export default ServiceProject
