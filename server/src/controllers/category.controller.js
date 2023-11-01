import path from 'path'
import { fileURLToPath } from 'url'
import slugify from 'slugify'

import CategoryModel from '../models/category.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const save = async (req, res) => {
  await CategoryModel.create({
    ...req.body,
    parent: req.body.parent || undefined,
    slug: slugify(req.body.name).toLowerCase(),
  })
  return res.status(201).json({
    success: true,
    message: 'Categoria criada com sucesso',
  })
}

export const findAll = async (req, res) => {
  const allFinded = await CategoryModel.find({})
  return res.status(200).json(allFinded)
}

export const findById = async (req, res) => {
  const finded = await CategoryModel.findById(req.params.id)
  return res.status(200).json(finded)
}

export const update = async (req, res) => {
  const finded = await CategoryModel.findById(req.params.id)
  if (!finded) throw new ErrorHandler('Categoria não cadastrada', 422)

  if (req.body.image !== finded.image) {
    const pathfile = path.join(__dirname, '../public/images/' + finded.image)
    fs.unlink(pathfile, function (err) {
      if (err) throw new ErrorHandler('Falha na atualização da imagem', 500)
    })
  }

  await CategoryModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
    parent: req.body.parent || undefined,
    slug: slugify(req.body.name).toLowerCase(),
  })
  return res
    .status(200)
    .json({ success: true, message: 'Categoria atualizada com sucesso' })
}

const categorySorted = (sorted) => {
  switch (sorted) {
    case 'asc':
      return { name: 1 }
    case 'desc':
      return { name: -1 }
    case 'news':
      return { createdAt: -1 }
    case 'old':
      return { createdAt: 1 }
    case 'latest':
      return { updatedAt: -1 }
    default:
      return { name: 1 }
  }
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
    sort: categorySorted(query.priority),
  })
  return res.status(200).json(finded)
}
