import {
  CheckCircle,
  Checks,
  MapPinLine,
  Notepad,
  User,
  WarningCircle,
  XCircle,
} from 'phosphor-react'
import DOMPurify from 'dompurify'
import truncHtml from 'trunc-html'

import { removeMask } from './mask'
import { OrderStatusEnumType } from '../types/enum-type'

export const mergeClassName = (first, last) => first + ' ' + last

export const sanitizeToken = (token) => token.replace(/[""]/g, '')

export const parsedSelectData = (arr, value, label, otherProps) =>
  arr.map((item) => ({
    value: item?.[value],
    label: item?.[label],
    ...(otherProps !== undefined &&
      otherProps.map((i) => ({ [i]: item?.[i] })))[0],
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
  hour: 'numeric',
  minute: 'numeric',
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

export const calculatePercentage = (min, max) =>
  min !== 0 && max > 0 ? Math.ceil((1 - min / max) * 100) : 0

export const cartCalculate = (cartItems) => {
  let subAmount = 0
  let shippingFee = 0
  let discount = 0

  cartItems.forEach((item) => {
    subAmount += item.price * item.quantity
    shippingFee += item.fee * item.quantity
    discount += item.regularPrice * item.quantity
  })

  return { subAmount, shippingFee, discount }
}

export const getOrderStatusColor = (orderStatus) => {
  switch (orderStatus) {
    case OrderStatusEnumType.Created:
      return 'text-blue-500'
    case OrderStatusEnumType.Pending:
      return 'text-purple-500'
    case OrderStatusEnumType.Paid:
      return 'text-lime-500'
    case OrderStatusEnumType.Canceled:
      return 'text-red-500'
    case OrderStatusEnumType.Progress:
      return 'text-orange-500'
    case OrderStatusEnumType.Traffic:
      return 'text-fuchsia-500'
    case OrderStatusEnumType.Delivered:
      return 'text-green-500'
  }
}

export const translateOrderStatus = (orderStatus) => {
  switch (orderStatus) {
    case OrderStatusEnumType.Created:
      return 'Criado'
    case OrderStatusEnumType.Pending:
      return 'Pendente'
    case OrderStatusEnumType.Paid:
      return 'Pago'
    case OrderStatusEnumType.Canceled:
      return 'Cancelado'
    case OrderStatusEnumType.Progress:
      return 'Embalando'
    case OrderStatusEnumType.Traffic:
      return 'Em trânsito'
    case OrderStatusEnumType.Delivered:
      return 'Entregue'
  }
}

export const getOrderHistoryStyle = (orderStatus) => {
  const node = { dateTime: orderStatus.dateTime }
  switch (orderStatus.history) {
    case OrderStatusEnumType.Created:
      node.bgIcon = 'bg-blue-50'
      node.icon = <Notepad size={20} className="text-blue-500" />
      node.text = 'Pedido criado.'
      return node
    case OrderStatusEnumType.Pending:
      node.bgIcon = 'bg-purple-50'
      node.icon = <WarningCircle size={20} className="text-purple-500" />
      node.text = 'Pagamento do pedido pendente.'
      return node
    case OrderStatusEnumType.Paid:
      node.bgIcon = 'bg-lime-50'
      node.icon = <CheckCircle size={20} className="text-lime-500" />
      node.text = 'Seu pedido foi pago com sucesso.'
      return node
    case OrderStatusEnumType.Canceled:
      node.bgIcon = 'bg-red-50'
      node.icon = <XCircle size={20} className="text-red-500" />
      node.text = 'Pedido cancelado.'
      return node
    case OrderStatusEnumType.Progress:
      node.bgIcon = 'bg-orange-50'
      node.icon = <User size={20} className="text-orange-500" />
      node.text = 'Seu pedido está sendo empacotado.'
      return node
    case OrderStatusEnumType.Traffic:
      node.bgIcon = 'bg-fuchsia-50'
      node.icon = <MapPinLine size={20} className="text-fuchsia-500" />
      node.text = 'Seu pedido está em trânsito para entrega.'
      return node
    case OrderStatusEnumType.Delivered:
      node.bgIcon = 'bg-green-50'
      node.icon = <Checks size={20} className="text-green-500" />
      node.text =
        'Seu pedido foi entregue. Obrigado por comprar na Furniture eCommerce!'
      return node
  }
}
