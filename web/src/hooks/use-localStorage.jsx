import { useEffect, useState } from 'react'

export default function useLocalStorage(item, initialValue) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const itemValue = localStorage.getItem(item)
    if (itemValue) setValue(JSON.parse(itemValue))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdate = (newValue) => {
    setValue(newValue)
    localStorage.setItem(item, JSON.stringify(newValue))
  }

  return { value, handleUpdate }
}
