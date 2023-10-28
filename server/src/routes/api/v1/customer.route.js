import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import { userAuth, customerAuth } from '../../../middlewares/auth.middleware.js'
import * as customerMiddleware from '../../../middlewares/customer.middleware.js'
import * as customerController from '../../../controllers/customer.controller.js'

const router = express.Router()

router.post(
  '/sign-up',
  validate(customerMiddleware.signUp),
  useError(customerController.signUp)
)
router.post(
  '/sign-up/confirm',
  validate(customerMiddleware.confirmSignUp),
  useError(customerController.confirmSignUp)
)
router.post(
  '/activated-token',
  validate(customerMiddleware.activatedToken),
  useError(customerController.activatedToken)
)
router.post(
  '/sign-in',
  validate(customerMiddleware.signIn),
  useError(customerController.signIn)
)
router.post(
  '/generate-recovery-password',
  validate(customerMiddleware.generateRecoveryPassword),
  useError(customerController.generateRecoveryPassword)
)
router.post(
  '/recovery-password',
  validate(customerMiddleware.recoveryPassword),
  useError(customerController.recoveryPassword)
)
router.put(
  '/update',
  useError(userAuth),
  useError(customerAuth),
  validate(customerMiddleware.update),
  useError(customerController.update)
)
router.patch(
  '/change-password',
  useError(userAuth),
  useError(customerAuth),
  validate(customerMiddleware.changePassword),
  useError(customerController.changePassword)
)

export default router
