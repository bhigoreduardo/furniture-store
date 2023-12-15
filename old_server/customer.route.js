import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import {
  userAuth,
  customerAuth,
  adminAuth,
} from '../../../middlewares/auth.middleware.js'
import * as customerMiddleware from '../../../middlewares/customer.middleware.js'
import * as customerController from './customer.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

// AUTH

// ADMIN

// ORDERS

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
router.get(
  '/last-history',
  useError(userAuth),
  useError(customerAuth),
  useError(customerController.lastHistory)
)

// ADMIN
router.get(
  '/:id/last-history',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.findByIdLastHistory)
)
router.get(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(customerController.findById)
)

export default router
