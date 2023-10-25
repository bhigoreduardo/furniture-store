import { useEffect, useState } from 'react'

import api from '../libs/api'

const useAuth = async (endPoint, values) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.post(endPoint, values)
      setData(data)
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, error }
}

export default useAuth
