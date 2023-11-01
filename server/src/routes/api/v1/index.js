import express from 'express'

import customer from './customer.route.js'
import store from './store.route.js'
import category from './category.route.js'

const router = express.Router()

router.use('/customers', customer)
router.use('/stores', store)
router.use('/categories', category)

export default router
