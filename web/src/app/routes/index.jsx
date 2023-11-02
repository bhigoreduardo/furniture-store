import { createBrowserRouter } from 'react-router-dom'

import publicRouter from './public'
import adminRouter from './admin'

const router = createBrowserRouter(publicRouter.concat(adminRouter))

export default router
