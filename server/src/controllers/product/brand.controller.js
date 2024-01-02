import slugify from 'slugify'

import { removeServerImage } from '../../utils/helper.js'
import { filterSorted } from '../../utils/format.js'
import ErrorHandler from '../../middlewares/ErrorHandler.js'
import BrandModel from '../../models/product/brand.model.js'
import ProductModel from '../../models/product/product.model.js'

// SAVE
export const save = async (req, res) => {
  const { image } = req.body
  try {
    await BrandModel.create({
      ...req.body,
      slug: slugify(req.body.name).toLowerCase(),
    })
    return res.status(201).json({
      success: true,
      message: 'Marca criada com sucesso',
    })
  } catch (error) {
    if (typeof image !== 'undefined') removeServerImage(image)
    next(error)
  }
}

// UPDATE
export const update = async (req, res) => {
  const { image } = req.body
  try {
    const finded = await BrandModel.findById(req.params.id)
    if (!finded) throw new ErrorHandler('Marca não cadastrada', 422)

    if (image !== finded.image) removeServerImage(finded.image)

    await BrandModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      slug: slugify(req.body.name).toLowerCase(),
    })
    return res
      .status(200)
      .json({ success: true, message: 'Marca atualizada com sucesso' })
  } catch (error) {
    if (typeof image !== 'undefined') removeServerImage(image)
    next(error)
  }
}

// SEARCH
export const findAll = async (req, res) => {
  const allFinded = await BrandModel.find({})
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
        { slug: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ],
    }),
  }
  const finded = await BrandModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await BrandModel.findById(req.params.id)
  return res.status(200).json(finded)
}

// REMOVE
export const remove = async (req, res) => {
  const allFindedProduct = await ProductModel.find({ brand: req.params.id })
  if (allFindedProduct?.length > 0)
    return res
      .status(422)
      .json({ success: false, message: 'Marca possui produtos' })

  const finded = await BrandModel.findById(req.params.id)
  if (!finded) throw new ErrorHandler('Marca não cadastrada', 422)

  removeServerImage(finded.image)
  await BrandModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({ success: true, message: 'Marca removida' })
}
