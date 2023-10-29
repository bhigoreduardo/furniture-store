import express from 'express'

import customer from './customer.route.js'
import store from './store.route.js'

const router = express.Router()

router.use('/customers', customer)
router.use('/stores', store)

export default router
