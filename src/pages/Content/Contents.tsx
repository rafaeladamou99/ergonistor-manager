import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useApi from "../../api/api-service/useApiService"
import { ContentResponse } from "../../types/types"

const Contents = () => {
  const navigate = useNavigate()
  const { get, data } = useApi<ContentResponse[]>("/content/all-contents")

  const navigateToContent = (id: string) => () => {
    navigate(id)
  }

  useEffect(() => {
    get()
  }, [])
  return data === null ? (
    <CircularProgress />
  ) : (
    <div className="flex flex-col gap-6 items-center py-4">
      <span className="text-4xl font-semibold">Contents</span>
      <div className="w-full h-full flex items-center justify-center p-10 gap-4 flex-wrap">
        {data.map(({ content_title, _id }) => (
          <div
            key={_id}
            className={`p-4 w-80 h-60 border-2 border-secondary rounded-xl hover:border-primary cursor-pointer flex items-center justify-center text-xl font-medium`}
            onClick={navigateToContent(_id)}
          >
            {content_title}
          </div>
        ))}
        <div
          key="add-new-content"
          className={`p-4 w-80 h-60 border-2 border-secondary border-dashed rounded-xl hover:border-primary cursor-pointer flex items-center justify-center text-xl font-medium group`}
          onClick={navigateToContent("add")}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="text-secondary group-hover:text-primary"
          />
        </div>
      </div>
    </div>
  )
}

export default Contents
