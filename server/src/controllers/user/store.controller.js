import StoreModel from '../../models/user/store.model.js'

// UPDATE
export const toggleAvailable = async (req, res) => {
  await StoreModel.findByIdAndUpdate(req.userId, [
    { $set: { available: { $eq: [false, '$available'] } } },
  ])
  const finded = await StoreModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Status da loja alterada',
    ...finded.sendAuth(),
  })
}

// PUBLIC
export const find = async (req, res) => {
  const finded = await StoreModel.findOne({}, {}, { sort: { created_at: -1 } })
  return res.status(200).json(finded.sendPublic())
}
