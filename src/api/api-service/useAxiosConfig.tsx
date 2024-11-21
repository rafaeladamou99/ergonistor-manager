import axios from "axios"
import { useAuth } from "../../auth/useAuth"
const useAxiosConfig = () => {
  const {
    state: { access_token },
    dispatch
  } = useAuth()

  const axiosInstance = axios.create({
    baseURL: "https://ergonistor-be-production.up.railway.app:8000",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: "LOGOUT"
        })
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default useAxiosConfig
