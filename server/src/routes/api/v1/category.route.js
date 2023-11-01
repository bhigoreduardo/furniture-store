import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import * as categoryMiddleware from '../../../middlewares/category.middleware.js'
import * as categoryController from '../../../controllers/category.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(categoryMiddleware.save),
  useError(categoryController.save)
)
router.put(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(categoryMiddleware.update),
  useError(categoryController.update)
)
router.get('/', useError(categoryController.findAll))
router.get('/search', useError(categoryController.search))
router.get('/:id', useError(categoryController.findById))

export default router
