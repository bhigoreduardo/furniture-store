import { removeServerImage } from '../utils/helper.js'
import MediaModel from '../models/media.model.js'
import InventoryModel from '../models/inventory.model.js'
import ProductModel from '../models/product.model.js'

export const saveImage = async (req, res) => {
  return res.status(201).json({
    success: true,
    message: 'Imagem salva com sucesso',
    image: req.body.image,
  })
}

export const save = async (req, res, next) => {
  const {
    cover,
    backCover,
    gallery,
    video,
    productData: {
      inventory: { manageStock, stockStatus, lowStockWarning, info },
      shippingInfo,
    },
    ...rest
  } = req.body
  let media, infoDetails

  try {
    media = await MediaModel.create({
      cover,
      backCover,
      gallery,
      video,
    })
    infoDetails = await Promise.all(
      info.map(async (item) => await InventoryModel.create({ ...item }))
    )

    const rangePrice = { min: 0, max: 0, avg: 0 }
    infoDetails.forEach((item, i) => {
      const price = item?.offer?.offerValue
        ? item?.offer?.offerPrice
        : item.price

      rangePrice.min =
        i !== 0 ? (rangePrice.min > price ? price : rangePrice.min) : price
      rangePrice.max =
        i !== 0 ? (rangePrice.max < price ? price : rangePrice.max) : price
    })
    rangePrice.avg = (rangePrice.min + rangePrice.max) / 2

    const product = await ProductModel.create({
      productData: {
        media,
        inventory: {
          manageStock,
          stockStatus,
          lowStockWarning,
          info: infoDetails,
        },
        shippingInfo,
      },
      rangePrice,
      ...rest,
    })

    return res.status(201).json({
      success: true,
      message: 'Produto cadastrado com sucesso',
      product,
    })
  } catch (error) {
    removeServerImage(cover)
    removeServerImage(backCover)
    gallery.forEach((item) => removeServerImage(item))
    if (media) await MediaModel.findByIdAndRemove(media._id)
    if (infoDetails)
      await Promise.all(
        infoDetails.map(
          async (item) => await InventoryModel.findByIdAndRemove(item._id)
        )
      )
    next(error)
  }
}

// import qs from 'querystring'
// var body = ''

// req.on('data', function (data) {
//   body += data

//   if (body.length > 1e6) req.connection.destroy()
// })
// req.on('end', function () {
//   var post = qs.parse(body)
//   console.log(post)
// })
