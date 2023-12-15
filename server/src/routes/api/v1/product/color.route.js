import express from 'express'
import { validate } from 'express-validation'

import { useError } from '../../../../middlewares/ErrorHandler.js'
import * as authMiddleware from '../../../../middlewares/user/auth.middleware.js'
import * as colorMiddleware from '../../../../middlewares/product/color.middleware.js'
import * as colorController from '../../../../controllers/product/color.controller.js'

const router = express.Router()

// SAVE
router.post(
  '/',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(colorMiddleware.save),
  useError(colorController.save)
)

// UPDATE
router.put(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  validate(colorMiddleware.update),
  useError(colorController.update)
)

// SEARCH
router.get('/', useError(colorController.findAll))
router.get('/search', useError(colorController.search))
router.get('/:id', useError(colorController.findById))

// REMOVE
router.delete(
  '/:id',
  useError(authMiddleware.userAuth),
  useError(authMiddleware.employeeAdminStoreAuth),
  useError(colorController.remove)
)

export default router
