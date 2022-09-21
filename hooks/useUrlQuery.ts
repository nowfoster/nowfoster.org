import { useRouter } from "next/router"
import qs from "query-string"
import { useState } from "react"

type SupportedTypes = string | number | boolean | (string | number | boolean)[]

function useQueryState<T extends SupportedTypes>(
  key: string,
  initialValue?: T
): [T | undefined, (newValue: T) => void] {
  const { replace } = useRouter()

  const getValue = (key: string) => {
    const { search } = window.location

    const values = qs.parse(search, {
      parseBooleans: true,
      parseNumbers: true,
    })
    return values[key] as T
  }

  const [value, setValue] = useState<T | undefined>(
    typeof window !== "undefined" ? getValue(key) || initialValue : initialValue
  )

  const onSetValue = (newValue: T) => {
    const { origin, pathname, search } = window.location

    setValue(newValue)

    const values = qs.parse(search)

    const newQuery = qs.stringify({
      ...values,
      [key]: newValue || undefined,
    })

    if (`?${newQuery}` !== search)
      replace(`${origin}${pathname}?${newQuery}`, undefined, {
        scroll: false,
      })
  }

  return [value, onSetValue]
}

export default useQueryState
