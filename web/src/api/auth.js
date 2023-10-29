import api from '../libs/api'

const auth = async (endPoint, values) => {
  try {
    const { data } = await api.post(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export default auth