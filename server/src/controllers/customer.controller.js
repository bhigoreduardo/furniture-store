import { filterSorted } from '../utils/format.js'
import { sendInfoEmail } from '../utils/sendEmail.js'
import CustomerModel from '../models/customer.model.js'
import OrderModel from '../models/order.model.js'
import ProductModel from '../models/product.model.js'
import ErrorHandler from '../utils/ErrorHandler.js'

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

export const activatedToken = async (req, res) => {
  const finded = await CustomerModel.findOne({
    email: req.body.email,
    'activated.activatedStatus': false,
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

export const signIn = async (req, res) => {
  const finded = await CustomerModel.findOne({
    email: req.body.email,
    status: true,
  })
  if (!finded) throw new ErrorHandler('Usuário não cadastrado', 422)
  if (!finded.validatePassword(req.body.password))
    throw new ErrorHandler('Credenciais incorretas', 422)
  if (!finded.activated.activatedStatus)
    throw new ErrorHandler('Solicite novamente confirmação de email', 422)
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
  const emailInfo = {
    title: 'Recuperar Senha',
    name: finded.name,
    shortDescription: 'Acesse o link abaixo para redefinir sua senha.',
    email: finded.email,
    endPoint: `/redefinir-senha?token=${recoveryPassword.passwordResetToken}`,
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
  const finded = await CustomerModel.findOne({
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
  await CustomerModel.findOneAndUpdate(
    { _id: req.userId },
    { ...req.body, image: req.body.image ?? '' }
  )
  const finded = await CustomerModel.findOne({
    _id: req.userId,
  })
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
    ...finded.sendAuth(),
  })
}

export const updateAdmin = async (req, res) => {
  await CustomerModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
  })
}

export const changePassword = async (req, res) => {
  if (req.body.newPassword !== req.body.repeatPassword)
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
  const finded = await CustomerModel.paginate(filter, {
    page,
    limit,
    sort: filterSorted(query.priority),
  })
  finded.docs = finded?.docs.map((item) => item.sendPublic())
  return res.status(200).json(finded)
}

export const findById = async (req, res) => {
  const finded = await CustomerModel.findOne({ _id: req.params.id })
  return res.status(200).json(finded.sendPublic())
}

export const toggleStatus = async (req, res) => {
  await CustomerModel.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status }
  )
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
  })
}

export const searchOrders = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = Number(query.perPage) || 10
  const filter = {
    ...(query.search && {
      $or: [
        { code: { $regex: query.search, $options: 'i' } },
        // ...(typeof query.search === 'number' && {
        //   'payment.method': { $regex: Number(query.search), $options: 'i' },
        //   'payment.fee': { $regex: Number(query.search), $options: 'i' },
        //   'payment.amount': { $regex: Number(query.search), $options: 'i' },
        // }),
      ],
    }),
    // ...(query.orderStatus && { $or: [] }),
    ...((query.startDate || query.endDate) && {
      createdAt: {
        ...(query.startDate && { $gte: query.startDate }),
        ...(query.endDate && { $lte: query.endDate }),
      },
    }),
  }
  const finded = await OrderModel.paginate(
    { ...filter, 'customer.user': req.userId },
    {
      page,
      limit,
      select: '_id code status payment createdAt',
      populate: [
        {
          path: 'payment',
          populate: [{ path: 'method', select: '_id image method' }],
        },
      ],
    }
  )
  return res.status(200).json(finded)
}

export const findByIdOrders = async (req, res) => {
  const finded = await OrderModel.findOne({
    _id: req.params.id,
    'customer.user': req.userId,
  })
  return res.status(200).json(finded)
}

export const findOrderByCode = async (req, res) => {
  const finded = await OrderModel.findOne({
    code: req.params.code,
    'customer.user': req.userId,
    'customer.email': req.query.email,
  })
  return res.status(200).json(finded)
}

export const toggleFavorite = async (req, res) => {
  const { id: productId } = req.body
  const finded = await CustomerModel.findById(req.userId)
  if (!finded.favorits.includes(productId)) finded.favorits.push(productId)
  else
    finded.favorits = finded.favorits.filter(
      (item) => item.toString() !== productId
    )

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { favorits: finded.favorits },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Favoritos atualizado',
    ...findedUpdated.sendAuth(),
  })
}

export const toggleCompare = async (req, res) => {
  const { id: productId } = req.body
  const finded = await CustomerModel.findById(req.userId)
  console.log(finded.compare)
  // if (finded.compare.get(productId)) finded.compare.delete(productId)
  // else finded.set(productId)
  if (!finded.compare.includes(productId)) finded.compare.push(productId)
  else
    finded.compare = finded.compare.filter(
      (item) => item.toString() !== productId
    )

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { compare: finded.compare },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Comparar atualizado',
    ...findedUpdated.sendAuth(),
  })
}

export const updateHistory = async (req, res) => {
  const { id: productId } = req.body
  const today = new Date().toISOString().split('T')[0]
  const finded = await CustomerModel.findById(req.userId)
  if (!Object.keys(finded.history).includes(today))
    finded.history[today] = [productId]
  else {
    if (!finded.history[today].includes(productId))
      finded.history[today].push(productId)
  }

  await CustomerModel.findByIdAndUpdate(
    req.userId,
    { history: finded.history },
    { new: true }
  )

  const findedUpdated = await CustomerModel.findById(req.userId)
  return res.status(200).json({ success: true, ...findedUpdated.sendAuth() })
}

export const findSearchFavorits = async (req, res) => {
  const query = req.query
  const page = Number(query.page) || 0
  const limit = 10

  const finded = await CustomerModel.findById(req.userId).select('favorits')

  const allFinded = await Promise.all(
    finded.favorits.map(
      async (item) =>
        await ProductModel.paginate(
          { _id: item },
          {
            page,
            limit,
            select: '_id name rangePrice productData.media category status',
            populate: [
              { path: 'productData.media', select: 'cover' },
              { path: 'category', select: 'name' },
            ],
          }
        )
    )
  )

  return res.status(200).json(...allFinded)
}
