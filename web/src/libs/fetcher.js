import api from './api'

export const get = async (endPoint, setIsLoading, toast) => {
  try {
    setIsLoading(true)
    const { data } = await api.get(endPoint)
    if (data?.success) toast.success(data?.message)
    return data
  } catch (err) {
    const error = err?.response?.data
    toast.error(error?.message)
  } finally {
    setIsLoading(false)
  }
}

export const post = async (endPoint, values, setIsLoading, toast) => {
  try {
    setIsLoading(true)
    const { data } = await api.post(endPoint, values)
    if (data?.success) toast.success(data?.message)
    return data
  } catch (err) {
    const error = err?.response?.data
    toast.error(error?.message)
  } finally {
    setIsLoading(false)
  }
}

export const put = async (endPoint, values, setIsLoading, toast) => {
  try {
    setIsLoading(true)
    const { data } = await api.put(endPoint, values)
    if (data?.success) toast.success(data?.message)
    return data
  } catch (err) {
    const error = err?.response?.data
    toast.error(error?.message)
  } finally {
    setIsLoading(false)
  }
}

export const patch = async (endPoint, values, setIsLoading, toast) => {
  try {
    setIsLoading(true)
    const { data } = await api.patch(endPoint, values)
    if (data?.success) toast.success(data?.message)
    return data
  } catch (err) {
    const error = err?.response?.data
    toast.error(error?.message)
  } finally {
    setIsLoading(false)
  }
}

export const del = async (endPoint, values) => {
  try {
    const { data } = await api.delete(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}
