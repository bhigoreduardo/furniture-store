import { filterSorted } from '../utils/format.js'
import OfferModel from '../models/offer.model.js'

export const save = async (req, res) => {
  await OfferModel.create({ ...req.body })
  return res
    .status(201)
    .json({ success: true, message: 'Oferta criada com sucesso' })
}

export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { name: { $regex: query.search, $options: 'i' } },
        { complement: { $regex: query.search, $options: 'i' } },
      ],
    }),
    ...((query.startDate || query.endDate) && {
      createdAt: {
        ...(query.startDate && { $gte: query.startDate }),
        ...(query.endDate && { $lte: query.endDate }),
      },
    }),
  }
  const finded = await OfferModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  return res.status(200).json(finded)
}
