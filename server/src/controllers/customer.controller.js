import CustomerModel from '../models/customer.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'
import {
  activatedTokenEmail,
  generateRecoveryPasswordEmail,
} from '../utils/sendEmail.js'

export const signUp = async (req, res) => {
  const { password, repeatPassword, ...restBody } = req.body
  if (password !== repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)
  const created = new CustomerModel({ ...restBody })
  created.setPassword(password)
  const activated = created.generateActivatedToken()
  await created.save()
  await activatedTokenEmail(
    created,
    activated?.activatedToken,
    async (err = null, info = null) => {
      if (err) throw new ErrorHandler(err, 500)

      return res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso',
        info,
      })
    }
  )
}

export const confirmSignUp = async (req, res) => {
  const finded = await CustomerModel.findOne({
    'activated.activatedStatus': false,
    'activated.activatedToken': req.body.activatedToken,
    'activated.activatedTokenExpire': { $gte: new Date() },
  })
  if (!finded) throw new ErrorHandler('Token inválido, tente novamente', 400)

  finded.confirmActivatedToken()
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Conta verificada com sucesso',
  })
}

export const signIn = async (req, res) => {
  const finded = await CustomerModel.findOne({
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
  const finded = await CustomerModel.findOne({
    email: req.body.email,
    status: true,
  })
  if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)
  const recoveryPassword = finded.generateRecoveryPassword()
  await finded.save()
  await generateRecoveryPasswordEmail(
    finded,
    recoveryPassword,
    (err = null, info = null) => {
      if (err) throw new ErrorHandler(err, 500)

      return res.status(200).json({
        success: true,
        message: 'Solicitação realizada com sucesso',
        info,
      })
    }
  )
}

export const recoveryPassword = async (req, res) => {
  const finded = await CustomerModel.findOne({
    'recoveryPassword.passwordResetToken': req.body.passwordResetToken,
    'recoveryPassword.passwordResetExpires': { $gte: new Date() },
  })
  if (!finded)
    throw new ErrorHandler('Token inválido, contate o administrador', 422)

  finded.setPassword(req.body.newPassword)
  finded.clearRecoveryPassword()
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Senha alterada com sucesso',
  })
}

export const update = async (req, res) => {
  await CustomerModel.findOneAndUpdate({ _id: req.userId }, { ...req.body })
  const finded = await CustomerModel.findOne({ _id: req.userId })
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
    ...finded.sendAuth(),
  })
}

export const changePassword = async (req, res) => {
  if (req.body.password !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)
  const finded = await CustomerModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!finded.validatePassword(req.body.password))
    throw new ErrorHandler('Credenciais incorretas', 422)

  finded.setPassword(req.body.newPassword)
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Senha alterada com sucesso',
  })
}
