import DOMPurify from 'dompurify'
import truncHtml from 'trunc-html'
import { removeMask } from './mask'

export const mergeClassName = (first, last) => first + ' ' + last

export const sanitizeToken = (token) => token.replace(/[""]/g, '')

export const parsedSelectData = (arr, value, label, otherProps) =>
  arr.map((item) => ({
    value: item?.[value],
    label: item?.[label],
    ...(otherProps !== undefined &&
      otherProps.map((i) => ({ [i]: item?.[i] }))),
  }))

const recursion = (index, inputArr, node) => {
  if (index >= inputArr.length) return
  if (Array.isArray(inputArr[index])) {
    recursion(0, inputArr[index], node)
  } else {
    node.push(inputArr[index])
  }

  recursion(index + 1, inputArr, node)
}

export const flattenArray = (inputArr) => {
  if (inputArr === undefined) return
  const node = []
  recursion(0, inputArr, node)
  return node
}

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

export const currencyPrice = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const optionsFullLocaleDate = (isWeek = true) => ({
  ...(!isWeek ? '' : { weekday: 'long' }),
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const optionsShortLocaleDate = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}

export const typeOfString = (element) => typeof element === 'string'

export function createMarkup(html, limit) {
  if (limit) {
    return {
      __html: DOMPurify.sanitize(truncHtml(html, limit).html),
    }
  }

  return {
    __html: DOMPurify.sanitize(html),
  }
}

export const removeDataMask = (values, arr) => {
  arr.forEach((item) => {
    values[item] = removeMask(values[item])
  })
  return values
}

export const createEmptyArr = (len) =>
  Array.from({ length: len }, (_, k) => k + 1)

export const getBadgeColor = (badgeColor) => {
  switch (badgeColor) {
    case 'green':
      return 'bg-green-500'
    case 'red':
      return 'bg-red-500'
    case 'yellow':
      return 'bg-yellow-500'
    case 'blue':
      return 'bg-blue-500'
    default:
      return null
  }
}

export const getPercentageDiscountPrice = (min, max) =>
  Math.ceil(1 - min / max) * 100
