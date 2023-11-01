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
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Erro no servidor, contate o administrador'

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Valor do campo: '${Object.keys(
      err.keyValue
    )}' já cadastrado`
    err = new ErrorHandler(message, 400)
  }

  // Validation error
  else if (err instanceof ValidationError) {
    let message = ''
    const field = err.details?.body[0]?.path.slice(-1)[0]
    const type = err.details?.body[0]?.type

    if (type.includes('required'))
      message = `Valor do campo: '${field}' é obrigatório`

    else if (type.includes('empty'))
      message = `Valor do campo: '${field}' não pode ser vazio`

    else if (type.includes('email'))
      message = `Valor do campo: '${field}' deve ser email válido`

    else if (['length', 'min', 'max'].some((value) => type.includes(value)))
      message = `Valor do campo: '${field}' contém quantidade de caracteres inválido`

    else if (type.includes('unknown'))
      message = `Valor do campo: '${field}' não é aceito`

    err = new ErrorHandler(message, 422)
  }

  return res
    .status(err.statusCode)
    .json({ success: false, message: err.message })
}
