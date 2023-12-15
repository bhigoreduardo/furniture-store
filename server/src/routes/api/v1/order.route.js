import { validate } from 'express-validation'
import express from 'express'

import { useError } from '../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../middlewares/user/auth.middleware.js'
import * as orderMiddleware from '../../../middlewares/order.middleware.js'
import * as orderController from '../../../controllers/order.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  validate(orderMiddleware.save),
  useError(orderController.save)
)

// UPDATE
router.patch(
  '/:id/change-status',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(orderMiddleware.changeStatus),
  useError(orderController.changeStatus)
)

// ANALYTICS
router.get(
  '/analytics/customers',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  useError(orderController.analyticsCustomers)
)

// SEARCH
router.get(
  '/search',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(orderController.search)
)

router.get(
  '/search/customers',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  useError(orderController.searchCustomers)
)

router.get(
  '/:code/customers/code',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  validate(orderMiddleware.findByCodeCustomers),
  useError(orderController.findByCodeCustomers)
)

router.get(
  '/:id/customers',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.customerAuth),
  useError(orderController.findByIdCustomers)
)

router.get(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(orderController.findById)
)

export default router
