import api from './api'

export const get = async (endPoint) => {
  try {
    const { data } = await api.get(endPoint)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export const post = async (endPoint, values) => {
  try {
    const { data } = await api.post(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export const put = async (endPoint, values) => {
  try {
    const { data } = await api.put(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export const patch = async (endPoint, values) => {
  try {
    const { data } = await api.patch(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
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
