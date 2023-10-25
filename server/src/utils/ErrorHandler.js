import { ValidationError } from 'express-validation'

export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export const useError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export function errors(err, req, res, next) {
  console.log(err.details?.body[0]?.path.slice(-1)[0])
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Erro no servidor, contate o administrador'

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Valor do campo: '${Object.keys(err.keyValue)}' já cadastrado`
    err = new ErrorHandler(message, 400)
  }

  // Validation error
  if (err instanceof ValidationError) {
    const field = err.details?.body[0]?.path.slice(-1)[0]

    if (err.details?.body[0]?.type.includes('required')) {
      const message = `Valor do campo: '${field}' é obrigatório`
      err = new ErrorHandler(message, 422)
    }

    if (err.details?.body[0]?.type.includes('empty')) {
      const message = `Valor do campo: '${field}' não pode ser vazio`
      err = new ErrorHandler(message, 422)
    }

    if (err.details?.body[0]?.type.includes('email')) {
      const message = `Valor do campo: '${field}' deve ser email válido`
      err = new ErrorHandler(message, 422)
    }

    if (['length', 'min', 'max'].some((value) => err.details?.body[0]?.type.includes(value))) {
      const message = `Valor do campo: '${field}' contém quantidade de caracteres inválido`
      err = new ErrorHandler(message, 422)
    }
  }

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message })
}
