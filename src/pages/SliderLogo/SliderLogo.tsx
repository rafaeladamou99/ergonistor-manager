import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../../components/Button/Button"
import FileUpload from "../../components/FileUpload/FileUpload"
import TextField from "../../components/TextField/TextField"
import useSliderLogo from "./useSliderLogo"

const SliderLogo = () => {
  const {
    onChangeImg,
    removeImg,
    removeLogo,
    onSubmit,
    onChangeString,
    formik,
    formId,
    isLoading
  } = useSliderLogo()

  return (
    <div className="w-full h-full flex items-center justify-center md:p-10">
      <form
        className="w-full md:rounded-3xl bg-gray-100 p-6 flex flex-col gap-6 items-center"
        onSubmit={onSubmit}
        key={formId}
      >
        <div className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]">
          <TextField
            name="msg"
            onChange={onChangeString}
            label="Banner Message"
            hasError={!!formik.errors.msg && formik.touched.msg}
            errorMsg={formik.errors.msg}
            value={formik.values.msg}
          />
          <div className="flex gap-2 items-center">
            <FileUpload
              label="Logo"
              onChange={onChangeImg}
              name="logo"
              value={formik.values.logo}
              errorMsg={formik.errors.logo}
              hasError={!!formik.errors.logo}
            />
            {typeof formik.values.logo === "string" && formik.values.logo && (
              <FontAwesomeIcon
                icon={faTrash}
                onClick={removeLogo}
                className="cursor-pointer hover:text-red-700"
              />
            )}
          </div>
          {formik.values.imgs.map((img, index) => (
            <div className="flex gap-2 items-center">
              <FileUpload
                label={`Image ${index + 1}`}
                onChange={onChangeImg}
                name={`imgs[${index}]`}
                value={img}
                errorMsg={formik.errors.imgs?.[index]}
                hasError={!!formik.errors.imgs?.[index]}
              />
              {typeof img === "string" && img && (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={removeImg(index)}
                  className="cursor-pointer hover:text-red-700"
                />
              )}
            </div>
          ))}
        </div>
        <Button label="Save" isSubmit isLoading={isLoading} />
      </form>
    </div>
  )
}

export default SliderLogo
