import { removeServerImage } from '../utils/helper.js'
import PaymentModel from '../models/payment.model.js'

export const save = async (req, res, next) => {
  const { image } = req.body
  try {
    await PaymentModel.create({ ...req.body })
    return res.status(200).json({
      success: true,
      message: 'Pagamento cadastrado com sucesso',
    })
  } catch (error) {
    removeServerImage(image)
    next(error)
  }
}

export const update = async (req, res, next) => {
  const { image } = req.body
  try {
    const finded = await PaymentModel.findById(req.params.id)
    if (!finded) throw new ErrorHandler('Pagamento não cadastrado', 422)

    if (image !== finded.image) removeServerImage(finded.image)

    await PaymentModel.findByIdAndUpdate(req.params.id, { ...req.body })
    return res.status(200).json({
      success: true,
      message: 'Pagamento atualizado com sucesso',
    })
  } catch (error) {
    removeServerImage(image)
    next(error)
  }
}

export const remove = async (req, res) => {
  const finded = await PaymentModel.findById(req.params.id)
  if (!finded) throw new ErrorHandler('Pagamento não cadastrado', 422)
  removeServerImage(finded.image)
  await PaymentModel.findByIdAndDelete(req.params.id)
  return res.status(200).json({ success: true, message: 'Pagamento removido' })
}

export const findAll = async (req, res) => {
  const allFinded = await PaymentModel.find({}).select('-__v')
  return res.status(200).json(allFinded)
}
