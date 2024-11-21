import { useState, useEffect } from "react"

const useDebounce = <T,>(
  value: T,
  delay: number
): { debouncedValue: T; flush: () => void } => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const flush = () => {
    value !== debouncedValue && setDebouncedValue(value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debouncedValue, flush }
}

export default useDebounce
