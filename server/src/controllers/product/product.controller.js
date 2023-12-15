import { removeServerImage, saveInventoryInfo } from '../../utils/helper.js'
import { StepEnum, VisibilityEnum } from '../../types/product.type.js'
import { filterSorted } from '../../utils/format.js'
import ErrorHandler from '../../middlewares/ErrorHandler.js'
import BrandModel from '../../models/product/brand.model.js'
import CategoryModel from '../../models/product/category.model.js'
import ColorModel from '../../models/product/color.model.js'
import InventoryModel from '../../models/product/inventory.model.js'
import MediaModel from '../../models/product/media.model.js'
import ProductModel from '../../models/product/product.model.js'

// UTILS
const updateStorageGallery = (firstGallery, secondGallery) => {
  const isFirstGalleryGreater = firstGallery?.length > secondGallery?.length
  const mainGallery = isFirstGalleryGreater ? firstGallery : secondGallery
  const gallery = !isFirstGalleryGreater ? firstGallery : secondGallery

  mainGallery.forEach((item, i) => {
    if (gallery[i] !== item && typeof secondGallery[i] !== 'undefined') {
      removeServerImage(secondGallery[i])
    }
  })
}

// SAVE
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
    const { infoDetails: infoSaveDetails, rangePrice } =
      await saveInventoryInfo(info)
    infoDetails = infoSaveDetails

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

    req.body.category.forEach(
      async (item) =>
        await CategoryModel.findByIdAndUpdate(item, {
          $push: { products: product._id },
        })
    )
    info.forEach(
      async (item) =>
        await ColorModel.findByIdAndUpdate(item.color, {
          $push: { products: product._id },
        })
    )
    await BrandModel.findByIdAndUpdate(req.body.brand, {
      $push: { products: product._id },
    })

    return res.status(201).json({
      success: true,
      message: 'Produto cadastrado com sucesso',
    })
  } catch (error) {
    removeServerImage(cover)
    removeServerImage(backCover)

    gallery.forEach((item) => removeServerImage(item))
    if (media) await MediaModel.findByIdAndDelete(media._id)
    if (infoDetails)
      await Promise.all(
        infoDetails.map(
          async (item) => await InventoryModel.findByIdAndDelete(item._id)
        )
      )
    next(error)
  }
}

// UPDATE
export const update = async (req, res) => {
  const finded = await ProductModel.findById(req.params.id).populate(
    'productData.media'
  )
  if (!finded) throw new ErrorHandler('Produto não cadastrado', 422)

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

  const media = await MediaModel.findByIdAndUpdate(
    finded.productData.media._id,
    {
      cover,
      backCover,
      gallery,
      video,
    }
  )
  if (finded.productData.media.cover !== cover) removeServerImage(cover)
  if (finded.productData.media.backCover !== backCover)
    removeServerImage(backCover)
  updateStorageGallery(gallery, finded.productData.media.gallery)
  await Promise.all(
    finded.productData.inventory.info.map(
      async (item) => await InventoryModel.findByIdAndDelete(item.toString())
    )
  )
  const { infoDetails, rangePrice } = await saveInventoryInfo(info)
  await ProductModel.findByIdAndUpdate(req.params.id, {
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
  return res
    .status(200)
    .json({ success: true, message: 'Produto atualizado com sucesso' })
}

// SEARCH
export const findAll = async (req, res) => {
  const allFinded = await ProductModel.find({
    'published.step': StepEnum.Completed,
    'published.visibility': VisibilityEnum.Public,
  })
    .select('_id name productData.media rangePrice reviewsAvg reviews')
    .populate('productData.media')
  return res.status(200).json(allFinded)
}

export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 1
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { name: { $regex: query.search, $options: 'i' } },
        { sku: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } },
        { 'description.overview': { $regex: query.search, $options: 'i' } },
        { 'additional.detail': { $regex: query.search, $options: 'i' } },
        // ...(Number(query.search) !== NaN && {
        //   ...{
        //     'productData.shippingInfo.weight': Number(query.search),
        //     'productData.shippingInfo.length': Number(query.search),
        //     'productData.shippingInfo.width': Number(query.search),
        //     'productData.shippingInfo.height': Number(query.search),
        //     'productData.shippingInfo.fee': Number(query.search),
        //     'productData.shippingInfo.timeDelivery': Number(query.search),
        //   },
        // }),
        { 'seoData.slug': { $regex: query.search, $options: 'i' } },
        { 'seoData.metaTitle': { $regex: query.search, $options: 'i' } },
        { 'seoData.metaDescription': { $regex: query.search, $options: 'i' } },
      ],
    }),
    ...(query.category && { category: query.category }),
    ...(query.brand && { $in: { brand: req.brand?.split(',') } }),
    ...(query.priceRange && {
      ...{ 'rangePrice.min': { $gte: Number(query.priceRange.split('-')[0]) } },
      ...(Number(query.priceRange.split('-')[1]) > 0 && {
        'rangePrice.max': { $lte: Number(query.priceRange.split('-')[1]) },
      }),
    }),
    ...(query.public && {
      'published.step': StepEnum.Completed,
      'published.visibility': VisibilityEnum.Public,
    }),
  }
  const finded = await ProductModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
    select:
      '_id name category sku productData.media productData.inventory rangePrice reviewsAvg sales amountSales reviews',
    populate: [
      { path: 'category', select: 'name' },
      { path: 'productData.media', select: 'cover backCover' },
      { path: 'productData.inventory.info', select: 'stock' },
    ],
  })
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const query = req.query
  const finded = await ProductModel.findById(req.params.id).populate([
    {
      path: 'productData.inventory.info',
      select: '-__v',
      ...(query.color && {
        populate: [{ path: 'color', select: '_id name color' }],
      }),
    },
    { path: 'category', select: '_id name' },
    { path: 'brand', select: '_id name' },
    'productData.media',
    'reviews',
  ])
  return res.status(200).json(finded)
}

// REMOVE
export const remove = async (req, res) => {
  const finded = await ProductModel.findById(req.params.id).populate(
    'productData.media'
  )
  if (!finded) throw new ErrorHandler('Produto não cadastrado', 422)

  removeServerImage(finded.productData.media.cover)
  removeServerImage(finded.productData.media.backCover)
  finded.productData.media.gallery.forEach((item) => removeServerImage(item))
  await MediaModel.findByIdAndDelete(finded.productData.media._id.toString())
  await Promise.all(
    finded.productData.inventory.info.map(
      async (item) => await InventoryModel.findByIdAndDelete(item.toString())
    )
  )
  await ProductModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({ success: true, message: 'Produto removido' })
}
