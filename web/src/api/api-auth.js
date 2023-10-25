import api from '../libs/api'

const apiAuth = async (endPoint, values) => {
  try {
    const { data } = await api.post(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export default apiAuth
