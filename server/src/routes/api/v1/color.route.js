import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../utils/ErrorHandler.js'
import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import * as colorMiddleware from '../../../middlewares/color.middleware.js'
import * as colorController from '../../../controllers/color.controller.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(adminAuth),
  validate(colorMiddleware.save),
  useError(colorController.save)
)
router.put(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  validate(colorMiddleware.update),
  useError(colorController.update)
)
router.get('/', useError(colorController.findAll))
router.get('/search', useError(colorController.search))
router.get('/:id', useError(colorController.findById))
router.delete(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(colorController.remove)
)

export default router
