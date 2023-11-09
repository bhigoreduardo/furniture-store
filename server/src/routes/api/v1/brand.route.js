import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import * as brandMiddleware from '../../../middlewares/brand.middleware.js'
import * as brandController from '../../../controllers/brand.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(brandMiddleware.save),
  useError(brandController.save)
)
router.put(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(brandMiddleware.update),
  useError(brandController.update)
)
router.get('/', useError(brandController.findAll))
router.get('/search', useError(brandController.search))
router.get('/:id', useError(brandController.findById))
router.delete(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(brandController.remove)
)

export default router
