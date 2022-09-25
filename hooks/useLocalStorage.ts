import { useState, useEffect, Dispatch } from "react"

const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [value: T, setValue: Dispatch<T>] => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    try {
      const retr = localStorage.getItem(key)
      setValue(retr ? JSON.parse(retr) : defaultValue)
    } catch (e) {
      setValue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [
    value,
    newValue => {
      setValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    },
  ]
}

export default useLocalStorage
