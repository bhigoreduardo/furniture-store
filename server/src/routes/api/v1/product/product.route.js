import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as productMiddleware from '../../../../middlewares/product/product.middleware.js'
import * as productController from '../../../../controllers/product/product.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(productMiddleware.save),
  useError(productController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  // validate(productMiddleware.update),
  useError(productController.update)
)

// SEARCH
router.get('/', useError(productController.findAll))
router.get('/search', useError(productController.search))
router.get('/:id', useError(productController.findById))

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(productController.remove)
)

export default router
