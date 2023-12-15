import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import upload from '../../../../config/multer.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as categoryMiddleware from '../../../../middlewares/product/category.middleware.js'
import * as categoryController from '../../../../controllers/product/category.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  upload.single('image'),
  validate(categoryMiddleware.save),
  useError(categoryController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  upload.single('image'),
  validate(categoryMiddleware.update),
  useError(categoryController.update)
)

// SEARCH
router.get('/', useError(categoryController.findAll))
router.get('/search', useError(categoryController.search))
router.get('/:id', useError(categoryController.findById))

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(categoryController.remove)
)

export default router
