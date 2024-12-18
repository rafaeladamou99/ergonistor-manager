import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress } from "@mui/material"
import { MouseEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useApi from "../../api/api-service/useApiService"
import Modal from "../../components/Modal/Modal"
import { ServiceProject } from "../../types/types"
import useSnackbar from "../../snackbar/useSnackbar"

export interface ServicesProjectsProps {
  type: "service" | "project" | "service-categories"
}
const ServicesProjects = ({ type }: ServicesProjectsProps) => {
  const [isModalOpen, setIsModalOpen] = useState<string | false>(false)
  const navigate = useNavigate()
  const { get, data } = useApi<ServiceProject[]>(`/${type}`)
  const { del, isSuccess } = useApi<ServiceProject[]>(`/${type}/${isModalOpen}`)
  const { setNotification } = useSnackbar()

  const handleOpenModal = (id: string) => (e: MouseEvent<SVGElement>) => {
    e.stopPropagation()
    setIsModalOpen(id)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const navigateToServiceProject = (id: string) => () => {
    navigate(id)
  }

  const onDelete = async () => {
    try {
      await del()
      setNotification({
        type: "OPEN",
        payload: {
          content: `Successfully deleted ${type}`,
          title: "Success",
          type: "success"
        }
      })
      setIsModalOpen(false)
      get()
    } catch {
      setNotification({
        type: "OPEN",
        payload: {
          content: "Something went wrong",
          title: "Error",
          type: "error"
        }
      })
    }
  }

  useEffect(() => {
    get()
  }, [])

  return data === null ? (
    <CircularProgress />
  ) : (
    <div className="flex flex-col gap-6 items-center py-4">
      <span className="text-4xl font-semibold">
        {type[0].toUpperCase()}
        {type.slice(1)}
        {type !== "service-categories" ? "s" : ""}
      </span>
      <div className="w-full h-full flex items-center justify-center p-10 gap-4 flex-wrap">
        {data.map(({ title, _id }, index) => (
          <div
            key={`${type}-${index}`}
            className={`p-4 w-80 h-60 border-2 border-secondary rounded-xl hover:border-primary cursor-pointer flex items-center justify-center text-xl font-medium relative`}
            onClick={navigateToServiceProject(_id)}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer hover:text-red-700 absolute top-2 right-2"
              onClick={handleOpenModal(_id)}
            />
            {title}
          </div>
        ))}
        <div
          key="add-new-content"
          className={`p-4 w-80 h-60 border-2 border-secondary border-dashed rounded-xl hover:border-primary cursor-pointer flex items-center justify-center text-xl font-medium group`}
          onClick={navigateToServiceProject("add")}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-secondary group-hover:text-primary"
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          content="Are you sure you want to delete this?"
          title={`Delete ${type}`}
          handleClose={handleCloseModal}
          handleSave={onDelete}
        />
      )}
    </div>
  )
}

export default ServicesProjects
