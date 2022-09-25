import { useEffect, useState } from "react"

const useUrlQuery = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)

  // useEffect(() => {}, [])

  return [value, setValue]
}

export default useUrlQuery
