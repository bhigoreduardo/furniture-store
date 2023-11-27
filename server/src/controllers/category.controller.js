import slugify from 'slugify'

import { filterSorted } from '../utils/format.js'
import { removeServerImage } from '../utils/helper.js'
import CategoryModel from '../models/category.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const save = async (req, res, next) => {
  const { image } = req.body
  try {
    await CategoryModel.create({
      ...req.body,
      parent: req.body.parent || null,
      slug: slugify(req.body.name).toLowerCase(),
    })
    return res.status(201).json({
      success: true,
      message: 'Categoria criada com sucesso',
    })
  } catch (error) {
    removeServerImage(image)
    next(error)
  }
}

export const update = async (req, res) => {
  const { image, product: spotlights } = req.body
  try {
    const finded = await CategoryModel.findById(req.params.id)
    if (!finded) throw new ErrorHandler('Categoria não cadastrada', 422)

    if (image !== finded.image) removeServerImage(finded.image)

    await CategoryModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      parent: req.body.parent || undefined,
      slug: slugify(req.body.name).toLowerCase(),
      spotlights,
    })
    return res
      .status(200)
      .json({ success: true, message: 'Categoria atualizada com sucesso' })
  } catch (error) {
    removeServerImage(image)
    next(error)
  }
}

export const findAll = async (req, res) => {
  const allFinded = await CategoryModel.find({})
  return res.status(200).json(allFinded)
}

export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
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
  const finded = await CategoryModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await CategoryModel.findById(req.params.id)
  return res.status(200).json(finded)
}

export const remove = async (req, res) => {
  const finded = await CategoryModel.findById(req.params.id)
  if (!finded) throw new ErrorHandler('Categoria não cadastrada', 422)
  removeServerImage(finded.image)
  await CategoryModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({ success: true, message: 'Categoria removida' })
}
