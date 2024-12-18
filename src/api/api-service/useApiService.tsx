import { useState, useEffect, useCallback } from "react"
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios"
import useAxiosConfig from "./useAxiosConfig"

type UseApiResponse<TData = undefined, TPayload = undefined> = {
  isLoading: boolean
  error: string | null
  get: () => Promise<void>
  post: (body: any) => Promise<void>
  put: (body: any) => Promise<void>
  patch: (body: any) => Promise<void>
  del: () => Promise<void>
  isError: boolean
} & ({ data: null; isSuccess: false } | { data: TData; isSuccess: true })

const useApi = <TData = undefined, TPayload = undefined>(
  url: string
): UseApiResponse<TData, TPayload> => {
  const axiosInstance = useAxiosConfig()
  const [data, setData] = useState<TData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const makeRequest = useCallback(
    async (method: Method, body?: TPayload) => {
      setIsLoading(true)
      try {
        const response = await axiosInstance({
          url,
          method,
          data: body
        })
        setData(response.data)
        setError(null)
        setIsSuccess(true)
        setIsError(false)
      } catch (err) {
        setError(
          err instanceof AxiosError
            ? err.response?.data.message
            : "An error occurred"
        )
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [url]
  )

  const get = useCallback(async () => {
    await makeRequest("GET")
  }, [makeRequest])

  const post = useCallback(
    async (body: TPayload) => {
      await makeRequest("POST", body)
    },
    [makeRequest]
  )

  const put = useCallback(
    async (body: TPayload) => {
      await makeRequest("PUT", body)
    },
    [makeRequest]
  )

  const patch = useCallback(
    async (body: TPayload) => {
      await makeRequest("PATCH", body)
    },
    [makeRequest]
  )

  const del = useCallback(async () => {
    await makeRequest("DELETE")
  }, [makeRequest])

  const dataAndIsSuccess:
    | { data: TData; isSuccess: true }
    | { data: null; isSuccess: false } =
    data && isSuccess && !isLoading
      ? { data, isSuccess: true }
      : { data: null, isSuccess: false }

  return {
    ...dataAndIsSuccess,
    isLoading,
    error,
    get,
    post,
    put,
    patch,
    del,
    isError: isError && !isLoading
  }
}

export default useApi
