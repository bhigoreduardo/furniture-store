import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as brandMiddleware from '../../../../middlewares/product/brand.middleware.js'
import * as brandController from '../../../../controllers/product/brand.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  upload.single('image'),
  validate(brandMiddleware.save),
  useError(brandController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  upload.single('image'),
  validate(brandMiddleware.update),
  useError(brandController.update)
)

// SEARCH
router.get('/', useError(brandController.findAll))
router.get('/search', useError(brandController.search))
router.get('/:id', useError(brandController.findById))

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(brandController.remove)
)

export default router
