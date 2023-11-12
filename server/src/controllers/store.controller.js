import { removeServerImage } from '../utils/helper.js'
import { sendInfoEmail } from '../utils/sendEmail.js'
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
    status: true,
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

export const generateRecoveryPassword = async (req, res) => {
  const finded = await StoreModel.findOne({
    email: req.body.email,
  })
  if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)
  const recoveryPassword = finded.generateRecoveryPassword()
  await finded.save()
  const emailInfo = {
    title: 'Recuperar Senha',
    name: finded.name,
    shortDescription: 'Acesse o link abaixo para redefinir sua senha.',
    email: finded.email,
    endPoint: `/admin/redefinir-senha?token=${recoveryPassword.passwordResetToken}`,
    message: {
      fail: 'Falha no envio do email para recuperar senha, entre em contato com o administrador',
      success: 'Verifique seu email, para recuperar sua senha',
    },
  }
  await sendInfoEmail(emailInfo, (err = null, info = null) => {
    if (err) throw new ErrorHandler(err, 500)

    return res.status(200).json({
      success: true,
      message: 'Solicitação realizada com sucesso',
      info,
    })
  })
}

export const recoveryPassword = async (req, res) => {
  if (req.body.password !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)
  const finded = await StoreModel.findOne({
    'recoveryPassword.passwordResetToken': req.body.passwordResetToken,
    'recoveryPassword.passwordResetExpires': { $gte: new Date() },
  })
  if (!finded)
    throw new ErrorHandler('Token inválido, contate o administrador', 422)

  finded.setPassword(req.body.password)
  finded.clearRecoveryPassword()
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Senha alterada com sucesso',
  })
}

export const update = async (req, res) => {
  const { image } = req.body

  try {
    const finded = await StoreModel.findById(req.userId)
    if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)
    await StoreModel.findByIdAndUpdate(req.userId, { ...req.body })
    if (
      typeof image !== 'undefined' &&
      typeof finded.image !== 'undefined' &&
      finded.image !== image
    )
      removeServerImage(finded.image)
    const findedUpdate = await StoreModel.findById(req.userId)
    return res.status(200).json({
      success: true,
      message: 'Atualização realizada com sucesso',
      ...findedUpdate.sendAuth(),
    })
  } catch (error) {
    if (typeof image !== 'undefined') removeServerImage(image)
    next(error)
  }
}

export const changePassword = async (req, res) => {
  if (req.body.newPassword !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)
  const finded = await StoreModel.findById(req.userId)
  if (!finded.validatePassword(req.body.password))
    throw new ErrorHandler('Credenciais incorretas', 422)

  finded.setPassword(req.body.newPassword)
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Senha alterada com sucesso',
  })
}

export const toggleAvailable = async (req, res) => {
  await StoreModel.findByIdAndUpdate(req.userId, {
    available: req.body.available,
  })
  const finded = await StoreModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Status da loja alterada',
    ...finded.sendAuth(),
  })
}

export const findAll = async (req, res) => {
  const finded = await StoreModel.findOne({}, {}, { sort: { created_at: -1 } })
  return res.status(200).json(finded.sendPublic())
}
