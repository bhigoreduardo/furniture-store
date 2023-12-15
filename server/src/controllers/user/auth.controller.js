import { UserEnum } from '../../types/user.type.js'
import { sendInfoEmail } from '../../utils/send-email.js'
import { removeServerImage } from '../../utils/helper.js'
import StoreModel from '../../models/user/store.model.js'
import AdminModel from '../../models/user/admin.model.js'
import EmployeeModel from '../../models/user/employee.model.js'
import CustomerModel from '../../models/user/customer.model.js'
import ErrorHandler from '../../middlewares/ErrorHandler.js'

// UTILS
const findModelUserType = (_type) => {
  switch (_type) {
    case UserEnum.Store:
      return StoreModel
    case UserEnum.Admin:
      return AdminModel
    case UserEnum.Employee:
      return EmployeeModel
    default:
      return CustomerModel
  }
}

export const findUserTypePath = (_type) => {
  switch (_type) {
    case UserEnum.Store:
      return 'loja'
    case UserEnum.Admin:
      return 'admin'
    case UserEnum.Employee:
      return 'colaborador'
    default:
      return ''
  }
}

// AUTH
export const save = async (req, res) => {
  const { _type } = req.body
  await findModelUserType(_type).create({ ...req.body, _type })
  return res
    .status(201)
    .json({ success: true, message: 'Usuário cadastrado com sucesso' })
}

export const signUp = async (req, res) => {
  const { _type, email } = req.body
  if (req.body.password !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 422)

  const finded = await findModelUserType(_type).findOne({
    email,
    activatedStatus: false,
  })
  if (!finded) throw new ErrorHandler('Cadastro de usuário inválido', 422)

  finded.setPassword(req.body.password)
  finded.activatedStatus = true
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Cadastro realizado com sucesso',
  })
}

export const signIn = async (req, res) => {
  const { _type, email } = req.body

  const finded = await findModelUserType(_type).findOne({
    email,
    status: true,
    activatedStatus: true,
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

// RECOVERY
export const generateRecoveryPassword = async (req, res) => {
  const { _type, email } = req.body

  const finded = await findModelUserType(_type).findOne({
    email,
    activatedStatus: true,
  })
  if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)

  const recoveryPassword = finded.generateRecoveryPassword()
  await finded.save()
  const userType = findUserTypePath(finded._type)
  const endPoint =
    userType !== ''
      ? `/acesso/${userType}/redefinir-senha?token=${recoveryPassword.passwordResetToken}`
      : `/redefinir-senha?token=${recoveryPassword.passwordResetToken}`
  const emailInfo = {
    title: 'Recuperar Senha',
    name: finded.name,
    shortDescription: 'Acesse o link abaixo para redefinir sua senha.',
    email: finded.email,
    endPoint: endPoint,
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
  const { _type } = req.body
  if (req.body.password !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)

  const finded = await findModelUserType(_type).findOne({
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

// UPDATE
export const update = async (req, res, next) => {
  const id = req.params.id
  const { _type, image } = req.body

  try {
    const modelType = findModelUserType(_type)
    const finded = await modelType.findById(id)
    if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)

    await modelType.findByIdAndUpdate(id, { ...req.body })
    if (image && finded.image && finded.image !== image)
      removeServerImage(finded.image)
    const findedUpdate = await modelType.findById(id)
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
  const { _type } = req.body
  if (req.body.newPassword !== req.body.repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)

  const finded = await findModelUserType(_type).findById(req.userId)
  if (!finded.validatePassword(req.body.password))
    throw new ErrorHandler('Credenciais incorretas', 422)

  finded.setPassword(req.body.newPassword)
  await finded.save()
  return res.status(200).json({
    success: true,
    message: 'Senha alterada com sucesso',
  })
}

export const toggleStatus = async (req, res) => {
  await findModelUserType(req.body._type).findOneAndUpdate(
    { _id: req.params.id },
    [{ $set: { status: { $eq: [false, '$status'] } } }]
  )
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
  })
}
