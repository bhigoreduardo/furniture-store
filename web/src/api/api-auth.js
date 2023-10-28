import api from '../libs/api'

export const apiAuth = async (endPoint, values) => {
  try {
    const { data } = await api.post(endPoint, values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}

export const apiGenerateRecoveryPassword = async (values) => {
  try {
    const { data } = await api.post('/customers/generate-recovery-password', values)
    return data
  } catch (err) {
    return err?.response?.data
  }
}
