import StoreModel from '../models/store.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const signUp = async (req, res) => {
  if (req.body.password !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 422)
  const finded = await StoreModel.findOne({
    email: req.body.email,
  })
  if (!finded || finded.status)
    throw new ErrorHandler('Usuário não cadastrado', 422)
  finded.setPassword(req.body.password)
  finded.status = true
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Cadastro realizado com sucesso',
  })
}

export const signIn = async (req, res) => {
  const finded = await StoreModel.findOne({
    email: req.body.email,
  })
  if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)
  if (!finded.validatePassword(req.body.password))
    throw new ErrorHandler('Credenciais incorretas', 422)
  return res.status(200).json({
    success: true,
    message: 'Login realizado com sucesso',
    ...finded.sendAuth(),
  })
}
