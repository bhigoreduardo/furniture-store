import { filterSorted } from '../utils/format.js'
import { sendInfoEmail } from '../utils/sendEmail.js'
import { removeServerImage } from '../utils/helper.js'
import CustomerModel from '../models/customer.model.js'
import OrderModel from '../models/order.model.js'
import ProductModel from '../models/product.model.js'
import ReviewModel from '../models/review.model.js'
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
  const { image } = req.body
  const finded = await CustomerModel.findById(req.userId)
  if (finded.image && finded.image !== image) removeServerImage(finded.image)

  await CustomerModel.findByIdAndUpdate(req.userId, {
    ...req.body,
    image: image ?? '',
  })
  const findedUpdate = await CustomerModel.findById(req.userId)
  return res.status(200).json({
    success: true,
    message: 'Atualização realizada com sucesso',
    ...findedUpdate.sendAuth(),
  })
}

export const updateAdmin = async (req, res) => {
  const { image } = req.body
  const finded = await CustomerModel.findById(req.params.id)
  if (finded.image && finded.image !== image) removeServerImage(finded.image)

  await CustomerModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
    image: image ?? '',
  })
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

// ORDERS
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
      sort: { createdAt: -1 },
    }
  )
  return res.status(200).json(finded)
}

export const findByIdOrders = async (req, res) => {
  const finded = await OrderModel.findOne({
    _id: req.params.id,
    'customer.user': req.userId,
  }).populate(['cart.review'])
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

export const ordersAnalytics = async (req, res) => {
  const allFinded = await OrderModel.find({
    'customer.user': req.userId,
  }).select('status')
  return res.status(200).json(allFinded)
}

// PRODUCTS
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
  const allFinded = await ProductModel.paginate(
    { _id: { $in: finded.favorits } },
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
  return res.status(200).json(allFinded)
}

export const findAllCompare = async (req, res) => {
  const finded = await CustomerModel.findById(req.userId).select('compare')

  const allFinded =
    finded.compare !== undefined
      ? await Promise.all(
          finded.compare.map(
            async (item) =>
              await ProductModel.findById(item)
                .select(
                  '_id name rangePrice productData.media productData.shippingInfo category brand status createdAt'
                )
                .populate([
                  { path: 'productData.media', select: 'cover' },
                  { path: 'category', select: 'name' },
                  { path: 'brand', select: 'name' },
                ])
          )
        )
      : []

  return res.status(200).json(allFinded)
}

export const findSearchHistory = async (req, res) => {
  const finded = await CustomerModel.findById(req.userId).select('history')
  const keys = Object.keys(finded.history)

  const allFinded = []
  if (keys?.length > 0) {
    keys.forEach(async (key) => {
      await Promise.all(
        finded.history[key].map(async (item) =>
          allFinded.push(await ProductModel.findById(item).select('name'))
        )
      )
    })
  }

  return res.status(200).json(allFinded)
}

export const ratingReview = async (req, res) => {
  const { customer, image, order, cartItem, description } = req.body
  const stars = Number(req.body.stars)

  const findedOrder = await OrderModel.findOne({
    _id: order,
    'customer.user': req.userId,
  })
  if (!findedOrder) throw new ErrorHandler('Pedido não cadastrado', 500)

  findedOrder.cart = await Promise.all(
    findedOrder?.cart?.map(async (item) => {
      if (item._id.toString() === cartItem) {
        if (item.reviewd) throw new ErrorHandler('Produto já avaliado', 400)

        const findedProduct = await ProductModel.findById(item.product)
        if (!findedProduct)
          throw new ErrorHandler('Produto não cadastrado', 400)

        const review = await ReviewModel.create({
          customer,
          image,
          stars,
          description,
        })
        item.review = review
        item.reviewd = true

        const reviewsAmount = findedProduct?.reviewsAvg?.amount + stars
        const reviewsLength = findedProduct?.reviews?.length + 1
        const reviewsAvg =
          reviewsLength > 0 ? Math.round(reviewsAmount / reviewsLength) : 0
        const starAmount = findedProduct?.reviewsAvg?.starAmount

        switch (stars) {
          case 1:
            starAmount['oneStar'] = starAmount?.oneStar + 1
            break
          case 2:
            starAmount['twoStar'] = starAmount?.twoStar + 1
            break
          case 3:
            starAmount['threeStar'] = starAmount?.threeStar + 1
            break
          case 4:
            starAmount['fourStar'] = starAmount?.fourStar + 1
            break
          case 5:
            starAmount['fiveStar'] = starAmount?.fiveStar + 1
            break
        }
        await ProductModel.findByIdAndUpdate(item.product, {
          $push: { reviews: review },
          reviewsAvg: {
            amount: reviewsAmount,
            avg: reviewsAvg,
            starAmount,
          },
        })
      }

      return item
    })
  )

  await findedOrder.save()
  return res.status(200).json({ success: true, message: 'Produto avaliado' })
}
