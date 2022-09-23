import { useEffect, useState } from "react"

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newVal: T) => void] {
  const getValue = () => {}

  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) setValue(JSON.parse(item))
    } catch (e) {}
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
