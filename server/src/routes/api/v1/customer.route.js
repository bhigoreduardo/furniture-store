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
router.patch(
  '/change-password',
  useError(userAuth),
  useError(customerAuth),
  validate(customerMiddleware.changePassword),
  useError(customerController.changePassword)
)

// ADMIN
router.put(
  '/update/:id/admin',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(customerMiddleware.update),
  useError(customerController.updateAdmin)
)
router.get(
  '/search',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.search)
)
router.patch(
  '/:id/toggle-status',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.toggleStatus)
)

// ORDERS
router.get(
  '/search/orders/',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.searchOrders)
)
router.get(
  '/orders/:id',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.findByIdOrders)
)
router.get(
  '/search/orders/:code',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.findOrderByCode)
)
router.post(
  '/rating-review',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.ratingReview)
)


// PRODUCT
router.patch(
  '/toggle-favorite',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.toggleFavorite)
)
router.patch(
  '/toggle-compare',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.toggleCompare)
)
router.patch(
  '/update-history',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.updateHistory)
)
router.get(
  '/favorits/search',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.findSearchFavorits)
)
router.get(
  '/compare',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.findAllCompare)
)
router.get(
  '/history/search',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.findSearchHistory)
)

// ADMIN
router.get(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.findById)
)

export default router
