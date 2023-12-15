import slugify from 'slugify'

import { filterSorted } from '../../utils/format.js'
import ColorModel from '../../models/product/color.model.js'

// SAVE
export const save = async (req, res) => {
  await ColorModel.create({
    ...req.body,
    slug: slugify(req.body.name).toLowerCase(),
  })
  return res.status(201).json({
    success: true,
    message: 'Cor criada com sucesso',
  })
}

// UPDATE
export const update = async (req, res) => {
  const finded = await ColorModel.findById(req.params.id)
  if (!finded) throw new ErrorHandler('Cor não cadastrada', 422)

  await ColorModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
    slug: slugify(req.body.name).toLowerCase(),
  })
  return res
    .status(200)
    .json({ success: true, message: 'Cor atualizada com sucesso' })
}

// SEARCH
export const findAll = async (req, res) => {
  const allFinded = await ColorModel.find({})
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

  const finded = await ColorModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await ColorModel.findById(req.params.id)
  return res.status(200).json(finded)
}

// REMOVE
export const remove = async (req, res) => {
  await ColorModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({ success: true, message: 'Cor removida' })
}
