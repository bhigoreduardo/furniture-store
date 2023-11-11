import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import ErrorHandler from './ErrorHandler.js'
import InventoryModel from '../models/inventory.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const removeServerImage = (image) => {
  const pathfile = path.join(__dirname, '../public/images/' + image)
  fs.unlink(pathfile, function (err) {
    if (err) throw new ErrorHandler('Falha na remoção da imagem', 500)
  })
}

export const saveInventoryInfo = async (info) => {
  const infoDetails = await Promise.all(
    info.map(async (item) => await InventoryModel.create({ ...item }))
  )

  const rangePrice = { min: 0, max: 0, avg: 0 }
  infoDetails.forEach((item, i) => {
    const price = item?.offer?.offerValue ? item?.offer?.offerPrice : item.price

    rangePrice.min =
      i !== 0 ? (rangePrice.min > price ? price : rangePrice.min) : price
    rangePrice.max =
      i !== 0 ? (rangePrice.max < price ? price : rangePrice.max) : price
  })
  rangePrice.avg = (rangePrice.min + rangePrice.max) / 2

  return { infoDetails, rangePrice }
}
