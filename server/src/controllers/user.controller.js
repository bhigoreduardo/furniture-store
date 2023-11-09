import UserModel from '../models/user.model.js'

import { filterSorted } from '../utils/format.js'

export const save = async (req, res) => {
  await UserModel.create({ ...req.body })
  return res
    .status(201)
    .json({ success: true, message: 'Usuário cadastrado com sucesso' })
}

export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { cpf: { $regex: query.search, $options: 'i' } },
        { whatsApp: { $regex: query.search, $options: 'i' } },
        { 'address.street': { $regex: query.search, $options: 'i' } },
        { 'address.neighborhood': { $regex: query.search, $options: 'i' } },
        { 'address.city': { $regex: query.search, $options: 'i' } },
        { 'address.state': { $regex: query.search, $options: 'i' } },
        { 'address.zipCode': { $regex: query.search, $options: 'i' } },
        { 'address.complement': { $regex: query.search, $options: 'i' } },
      ],
    }),
    ...(query.chatStatus && { chatStatus: query.chatStatus }),
    ...(query.status && { status: query.status }),
  }
  const finded = await UserModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  finded.docs = finded?.docs.map((item) => item.sendPublic())
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await UserModel.findOne({ _id: req.params.id })
  return res.status(200).json(finded.sendPublic())
}

export const updateAdmin = async (req, res) => {
  await UserModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
  })
}

export const toggleStatus = async (req, res) => {
  await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  )
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
  })
}
