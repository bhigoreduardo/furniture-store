import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import {
  userAuth,
  customerAuth,
  adminAuth,
} from '../../../middlewares/auth.middleware.js'
import * as customerMiddleware from '../../../middlewares/customer.middleware.js'
import * as customerController from '../../../controllers/customer.controller.js'
import upload from '../../../config/multer.js'

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
  upload.single('image'),
  validate(customerMiddleware.update),
  useError(customerController.update)
)
router.put(
  '/update/:id/admin',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(customerMiddleware.update),
  useError(customerController.updateAdmin)
)
router.patch(
  '/change-password',
  useError(userAuth),
  useError(customerAuth),
  validate(customerMiddleware.changePassword),
  useError(customerController.changePassword)
)
router.get(
  '/search',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.search)
)
router.get(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.findById)
)
router.patch(
  '/:id/toggle-status',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.toggleStatus)
)
router.get(
  '/search/orders/',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.searchOrders)
)

export default router
