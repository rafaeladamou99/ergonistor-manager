import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../../components/Button/Button"
import FileUpload from "../../../components/FileUpload/FileUpload"
import TextField from "../../../components/TextField/TextField"
import useServiceCategory from "./useServiceCategory"

const ServiceCategory = () => {
  const {
    onSubmit,
    formik,
    onChangeString,
    formId,
    onChangeImg,
    removeImg,
    isLoading
  } = useServiceCategory()

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
              name="img"
              value={formik.values.img}
              errorMsg={formik.errors.img}
              hasError={!!formik.errors.img}
            />
            {typeof formik.values.img === "string" && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeImg}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
        </div>
        <Button label="Save" isSubmit isLoading={isLoading} />
      </form>
    </div>
  )
}

export default ServiceCategory
