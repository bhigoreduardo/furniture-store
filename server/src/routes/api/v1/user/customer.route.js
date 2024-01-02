import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as authController from '../../../../controllers/user/auth.controller.js'
import * as customerMiddleware from '../../../../middlewares/user/customer.middleware.js'
import * as customerController from '../../../../controllers/user/customer.controller.js'
import customer from './combine/customer.route.js'

const router = express.Router()

// AUTH
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
  '/sign-up/activated-token',
  validate(customerMiddleware.activatedToken),
  useError(customerController.activatedToken)
)

// UPDATE
router.patch(
  '/change-password',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  validate(authMiddleware.changePassword),
  useError(authController.changePassword)
)
router.patch(
  '/:id/toggle-status',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.adminStoreAuth),
  useError(authController.toggleStatus)
)
router.patch(
  '/:id/toggle-history',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  useError(customerController.toggleHistory)
)
router.patch(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAdminStoreAuth),
  upload.single('image'),
  validate(customerMiddleware.update),
  useError(authController.update)
)

// EXTENDS
router.use(customer)

// SEARCH
router.get(
  '/search',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(customerController.search)
)
router.get(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(customerController.findById)
)

export default router
