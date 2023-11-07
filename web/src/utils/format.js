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

export const makeObjTree = (arr, parent) => {
  const node = {}
  arr
    .filter((item) => item.parent === parent)
    .forEach(
      (item) =>
        (node[item._id] = { name: item.name, ...makeObjTree(arr, item._id) })
    )
  return node
}

export const makeArrTree = (arr, parent) => {
  const node = []
  arr
    .filter((item) => item.parent === parent)
    .forEach((item) =>
      node.push({ ...item, children: makeArrTree(arr, item._id) })
    )

  return node
}

export const comparePathname = (pathname, cur) => pathname === cur

export const regexCaseIgnore = (search, value) => {
  const regex = new RegExp(search, 'i')
  return regex.test(value)
}
