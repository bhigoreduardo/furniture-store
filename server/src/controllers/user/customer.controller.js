import { filterSorted } from '../../utils/format.js'
import { sendInfoEmail } from '../../utils/send-email.js'
import ErrorHandler from '../../middlewares/ErrorHandler.js'
import CustomerModel from '../../models/user/customer.model.js'

// AUTH
export const signUp = async (req, res) => {
  const { password, repeatPassword, ...restBody } = req.body
  if (password !== repeatPassword)
    throw new ErrorHandler('Senhas inválidas', 400)

  const created = new CustomerModel({ ...restBody })
  created.setPassword(password)
  const activated = created.generateActivatedToken()
  await created.save()
  const emailInfo = {
    title: 'Ativar conta',
    name: created.name,
    shortDescription: 'Acesse o link abaixo para ativar sua conta.',
    email: created.email,
    endPoint: `/confirmar-conta?token=${activated?.activatedToken}`,
    message: {
      fail: 'Falha no envio do email para ativar sua conta, entre em contato com o administrador',
      success: 'Verifique seu email, para ativar sua conta',
    },
  }
  await sendInfoEmail(emailInfo, (err = null, info = null) => {
    if (err) throw new ErrorHandler(err, 500)

    return res.status(201).json({
      success: true,
      message: 'Cadastro realizado com sucesso',
      info,
    })
  })
}

export const confirmSignUp = async (req, res) => {
  const finded = await CustomerModel.findOne({
    activatedStatus: false,
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

export const activatedToken = async (req, res) => {
  const finded = await CustomerModel.findOne({
    email: req.body.email,
    activatedStatus: false,
  })
  if (!finded) throw new ErrorHandler('Usuário não encontrado', 400)

  const activated = finded.generateActivatedToken()
  await finded.save()
  const emailInfo = {
    title: 'Ativar conta',
    name: finded.name,
    shortDescription: 'Acesse o link abaixo para ativar sua conta.',
    email: finded.email,
    endPoint: `/confirmar-conta?token=${activated?.activatedToken}`,
    message: {
      fail: 'Falha no envio do email para ativar sua conta, entre em contato com o administrador',
      success: 'Verifique seu email, para ativar sua conta',
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

// UPDATE
export const toggleHistory = async (req, res) => {
  await CustomerModel.findByIdAndUpdate(req.userId, [
    {
      $set: { historyAvailable: { $eq: [false, '$historyAvailable'] } },
    },
  ])
  const finded = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
    ...finded.sendAuth(),
  })
}

// SEARCH
export const search = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 1
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
  const finded = await CustomerModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  finded.docs = finded?.docs.map((item) => item.sendPublic())
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await CustomerModel.findOne({ _id: req.params.id }).populate([
    {
      path: 'orders',
      select: '_id code status payment createdAt',
      limit: 10,
      sort: { createdAt: -1 },
      populate: [
        {
          path: 'payment',
          populate: [{ path: 'method', select: '_id image method' }],
        },
      ],
    },
  ])

  return res.status(200).json(finded.sendPublic())
}
