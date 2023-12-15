import { Joi } from 'express-validation'
import jwt from 'jsonwebtoken'

import config from '../../config/index.js'
import ErrorHandler from '../ErrorHandler.js'
import StoreModel from '../../models/user/store.model.js'
import AdminModel from '../../models/user/admin.model.js'
import EmployeeModel from '../../models/user/employee.model.js'
import CustomerModel from '../../models/user/customer.model.js'

// AUTH
export const save = {
  body: Joi.object({
    _type: Joi.string().required(),
    name: Joi.string().min(2).max(200).required(),
    email: Joi.string().email().required(),
    whatsApp: Joi.string().length(11).required(),
    cpf: Joi.string().length(11).required(),
  }),
}

export const signUp = {
  body: Joi.object({
    _type: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const signIn = {
  body: Joi.object({
    _type: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader)
    throw new ErrorHandler('Erro de autenticação: Token não informado', 401)

  const parts = authHeader.split(' ')
  if (!parts.length === 2)
    throw new ErrorHandler('Erro de autenticação: Token mal formatado', 401)

  const [scheme, token] = parts
  if (!/^Furniture$/i.test(scheme))
    throw new ErrorHandler('Erro de autenticação: Bearer token inválido', 401)

  jwt.verify(token, config.SERVER_JWT_SECRET, (err, decoded) => {
    if (err) throw new ErrorHandler('Erro de autenticação: Token inválido', 401)

    req.userId = decoded.id
    return next()
  })
}

export const storeAuth = async (req, res, next) => {
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const storeFinded = await StoreModel.findOne({ _id: req.userId })
  if (!storeFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const adminStoreAuth = async (req, res, next) => {
  const { id } = req.params
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const storeFinded = await StoreModel.findOne({ _id: req.userId })
  const adminFinded = await AdminModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!storeFinded && !adminFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  if (id && adminFinded && id !== req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const adminAuth = async (req, res, next) => {
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const adminFinded = await AdminModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!adminFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const employeeAdminStoreAuth = async (req, res, next) => {
  const { id } = req.params
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const storeFinded = await StoreModel.findOne({ _id: req.userId })
  const adminFinded = await AdminModel.findOne({
    _id: req.userId,
    status: true,
  })
  const employeeFinded = await EmployeeModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!storeFinded && !adminFinded && !employeeFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  if (id && employeeFinded && id !== req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const employeeAuth = async (req, res, next) => {
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const employeeFinded = await EmployeeModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!employeeFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const customerAdminStoreAuth = async (req, res, next) => {
  const { id } = req.params
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const storeFinded = await StoreModel.findOne({ _id: req.userId })
  const adminFinded = await AdminModel.findOne({
    _id: req.userId,
    status: true,
  })
  const customerFinded = await CustomerModel.findOne({
    _id: req.userId,
    status: true,
  })
  if (!storeFinded && !adminFinded && !customerFinded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  if (id && customerFinded && id !== req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

export const customerAuth = async (req, res, next) => {
  if (!req.userId)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)
  const finded = await CustomerModel.findOne({ _id: req.userId, status: true })
  if (!finded)
    throw new ErrorHandler('Erro de autenticação: Usuário inválido', 401)

  next()
}

// RECOVERY
export const generateRecoveryPassword = {
  body: Joi.object({
    _type: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
}

export const recoveryPassword = {
  body: Joi.object({
    _type: Joi.string().required(),
    passwordResetToken: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export const changePassword = {
  body: Joi.object({
    _type: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    repeatPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    newPassword: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}
