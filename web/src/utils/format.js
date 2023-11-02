export const mergeClassName = (first, last) => first + ' ' + last

export const sanitizeToken = (token) => token.replace(/[""]/g, '')

export const parsedSelectData = (arr, value, label) =>
  arr.map((item) => ({
    value: item?.[value],
    label: item?.[label],
  }))

export const sanitizeSelectData = (parsedData, arr) =>
  parsedData.filter((item) => !arr.includes(item.value))

export const formDataUpload = (values) => {
  const formData = new FormData()
  for (const value in values) {
    formData.append(value, values[value])
  }
  return formData
}
