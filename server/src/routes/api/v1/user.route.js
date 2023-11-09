import express from 'express'
import { validate } from 'express-validation'

import { adminAuth, userAuth } from '../../../middlewares/auth.middleware.js'
import { useError } from '../../../utils/ErrorHandler.js'
import * as userMiddleware from '../../../middlewares/user.middleware.js'
import * as userController from '../../../controllers/user.controller.js'
import upload from '../../../config/multer.js'

const router = express.Router()

router.post(
  '/',
  useError(userAuth),
  useError(adminAuth),
  validate(userMiddleware.save),
  useError(userController.save)
)
router.get(
  '/search',
  useError(userAuth),
  useError(adminAuth),
  useError(userController.search)
)
router.get(
  '/:id',
  useError(userAuth),
  useError(adminAuth),
  useError(userController.findById)
)
router.put(
  '/update/:id/admin',
  useError(userAuth),
  useError(adminAuth),
  upload.single('image'),
  validate(userMiddleware.update),
  useError(userController.updateAdmin)
)
router.patch(
  '/:id/toggle-status',
  useError(userAuth),
  useError(adminAuth),
  useError(userController.toggleStatus)
)

export default router
