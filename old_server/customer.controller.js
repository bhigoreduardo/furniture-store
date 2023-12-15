import { filterSorted } from '../utils/format.js'
import { sendInfoEmail } from '../utils/sendEmail.js'
import { removeServerImage } from '../utils/helper.js'
import CustomerModel from './customer.model.js'
import OrderModel from '../../models/order.model.js'
import ProductModel from './product.model.js'
import ReviewModel from '../../models/review.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

// PRODUCTS
export const toggleFavorite = async (req, res) => {
  const { id: productId } = req.body
  const finded = await CustomerModel.findById(req.userId)
  if (!finded.favorits.includes(productId)) finded.favorits.push(productId)
  else
    finded.favorits = finded.favorits.filter(
      (item) => item.toString() !== productId
    )

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { favorits: finded.favorits },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Favoritos atualizado',
    ...findedUpdated.sendAuth(),
  })
}

export const toggleCompare = async (req, res) => {
  const { id: productId } = req.body
  const finded = await CustomerModel.findById(req.userId)
  // if (finded.compare.get(productId)) finded.compare.delete(productId)
  // else finded.set(productId)
  if (!finded.compare.includes(productId)) finded.compare.push(productId)
  else
    finded.compare = finded.compare.filter(
      (item) => item.toString() !== productId
    )

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { compare: finded.compare },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Comparar atualizado',
    ...findedUpdated.sendAuth(),
  })
}

export const updateHistory = async (req, res) => {
  const { id: productId } = req.body
  const today = new Date().toISOString().split('T')[0]
  const finded = await CustomerModel.findById(req.userId)
  if (!Object.keys(finded.history).includes(today))
    finded.history[today] = [productId]
  else {
    if (!finded.history[today].includes(productId))
      finded.history[today].push(productId)
  }

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { history: finded.history },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({ success: true, ...findedUpdated.sendAuth() })
}

export const findSearchFavorits = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = 10

  const finded = await CustomerModel.findById(req.userId).select('favorits')
  const allFinded = await ProductModel.paginate(
    { _id: { $in: finded.favorits } },
    {
      page,
      limit,
      select: '_id name rangePrice productData.media category status',
      populate: [
        { path: 'productData.media', select: 'cover' },
        { path: 'category', select: 'name' },
      ],
    }
  )
  return res.status(200).json(allFinded)
}

export const findAllCompare = async (req, res) => {
  const finded = await CustomerModel.findById(req.userId).select('compare')

  const allFinded =
    finded.compare !== undefined
      ? await Promise.all(
          finded.compare.map(
            async (item) =>
              await ProductModel.findById(item)
                .select(
                  '_id name rangePrice productData.media productData.shippingInfo category brand status createdAt'
                )
                .populate([
                  { path: 'productData.media', select: 'cover' },
                  { path: 'category', select: 'name' },
                  { path: 'brand', select: 'name' },
                ])
          )
        )
      : []

  return res.status(200).json(allFinded)
}

export const lastHistory = async (req, res) => {
  const finded = await CustomerModel.findById(req.userId).select('history')
  const lastKey = Object.keys(finded.history)[0]

  let allFinded
  if (typeof lastKey !== 'undefined') {
    allFinded = finded.history[lastKey].map(
      async (item) =>
        await ProductModel.findById(item)
          .select('_id name productData.media rangePrice reviewsAvg reviews')
          .populate('productData.media')
    )
  }
  const data =
    typeof lastKey !== 'undefined' ? await Promise.all(allFinded) : []

  return res.status(200).json(data)
}

export const findByIdLastHistory = async (req, res) => {
  const finded = await CustomerModel.findById(req.params.id).select('history')
  const lastKey = Object.keys(finded.history)[0]

  let allFinded
  if (typeof lastKey !== 'undefined') {
    allFinded = finded.history[lastKey].map(
      async (item) =>
        await ProductModel.findById(item)
          .select('_id name productData.media rangePrice reviewsAvg reviews')
          .populate('productData.media')
    )
  }
  const data =
    typeof lastKey !== 'undefined' ? await Promise.all(allFinded) : []

  return res.status(200).json(data)
}

export const findSearchHistory = async (req, res) => {
  const query = req.query
  const finded = await CustomerModel.findById(req.userId).select('history')
  const allFinded = finded.history
  const keys = Object.keys(allFinded)
  const filter = {
    ...(query.search && {
      $or: [
        { name: { $regex: query.search, $options: 'i' } },
        { sku: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } },
        { 'description.overview': { $regex: query.search, $options: 'i' } },
        { 'additional.detail': { $regex: query.search, $options: 'i' } },
        { 'seoData.slug': { $regex: query.search, $options: 'i' } },
        { 'seoData.metaTitle': { $regex: query.search, $options: 'i' } },
        { 'seoData.metaDescription': { $regex: query.search, $options: 'i' } },
      ],
    }),
  }

  let allData
  if (keys?.length > 0) {
    keys.forEach((key) => {
      allData = allFinded[key].map(
        async (item) =>
          await ProductModel.findById(item)
            .select('_id name productData.media rangePrice reviewsAvg reviews')
            .populate('productData.media')
      )
    })
    allData = await Promise.all(allData)
    keys.forEach((key) => {
      allData.forEach((item) => {
        if (allFinded[key].includes(item._id.toString())) {
          allFinded[key].push(item)
        }
      })
      allFinded[key] = allFinded[key].filter((item) => typeof item !== 'string')
    })
  }
  const data = keys?.length > 0 ? allFinded : {}

  return res.status(200).json(data)
}

