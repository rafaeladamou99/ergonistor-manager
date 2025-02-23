import Button from "../../../components/Button/Button"
import TextField from "../../../components/TextField/TextField"
import useServiceCategory from "./useServiceCategory"

const ServiceCategory = () => {
  const { onSubmit, formik, onChangeString, formId, isLoading } =
    useServiceCategory()

  return (
    <div className="w-full h-full flex items-center justify-center md:p-10">
      <form
        className="w-full md:rounded-3xl bg-gray-100 p-6 flex flex-col gap-6 items-center"
        onSubmit={onSubmit}
        key={formId}
      >
        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="service-category"
        >
          <TextField
            name="title"
            onChange={onChangeString}
            label="Title"
            hasError={!!formik.errors.title && formik.touched.title}
            errorMsg={formik.errors.title}
            value={formik.values.title}
          />
        </div>
        <Button label="Save" isSubmit isLoading={isLoading} />
      </form>
    </div>
  )
}

export default ServiceCategory
