import jwt from 'jsonwebtoken'

import CustomerModel from '../models/customer.model.js'
import config from '../config/index.js'
import ErrorHandler from '../utils/ErrorHandler.js'

export const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new ErrorHandler('Erro de autenticação', 401)

  const parts = authHeader.split(' ')
  if (!parts.length === 2) throw new ErrorHandler('Erro de autenticação', 401)

  const [scheme, token] = parts
  if (!/^Furniture$/i.test(scheme))
    throw new ErrorHandler('Erro de autenticação', 401)

  jwt.verify(token, config.SERVER_JWT_SECRET, (err, decoded) => {
    if (err) throw new ErrorHandler('Erro de autenticação', 401)

    req.userId = decoded.id
    return next()
  })
}

export const customerAuth = async (req, res, next) => {
  if (!req.userId) throw new ErrorHandler('Erro de autenticação', 401)
  const finded = await CustomerModel.findOne({ _id: req.userId, status: true })
  if (!finded) throw new ErrorHandler('Erro de autenticação', 401)

  next()
}
