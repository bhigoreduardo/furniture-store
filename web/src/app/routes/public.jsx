import Layout from '../layouts/public'
import DashboardLayout from '../layouts/public/dashboard'

import Auth from '../pages/public/auth'
import SignUpConfirm from '../pages/public/auth/sign-up-confirm'
import ActivatedToken from '../pages/public/auth/activated-token'
import GenerateRecoveryPassword from '../pages/public/auth/generate-recovery-password'
import RecoveryPassword from '../pages/public/auth/recovery-password'

import Dashboard from '../pages/public/dashboard'
import Setting from '../pages/public/dashboard/setting'

import Home from '../pages/public/home'
import Product from '../pages/public/product'
import Tracker from '../pages/public/tracker'
import Maintenance from '../pages/public/maintenance'
import NotFound from '../pages/public/not-found'
import Cart from '../pages/public/cart'
import Checkout from '../pages/public/checkout'
import CheckoutSuccess from '../pages/public/checkout/checkout-success'
import Orders from '../pages/public/dashboard/orders'
import Order from '../pages/public/dashboard/orders/form'
import Wishlist from '../pages/public/wishlist'
import Compare from '../pages/public/compare'

const router = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/produto/:id',
        element: <Product />,
      },
      {
        path: '/carrinho',
        element: <Cart />,
      },
      {
        path: '/finalizar-compra',
        element: <Checkout />,
      },
      {
        path: '/compra-concluida',
        element: <CheckoutSuccess />,
      },
      {
        path: '/entrar',
        element: <Auth />,
      },
      {
        path: '/confirmar-conta',
        element: <SignUpConfirm />,
      },
      {
        path: '/ativar-conta',
        element: <ActivatedToken />,
      },
      {
        path: '/recuperar-senha',
        element: <GenerateRecoveryPassword />,
      },
      {
        path: '/redefinir-senha',
        element: <RecoveryPassword />,
      },
      {
        path: '/rastrear',
        element: <Tracker />,
      },
      {
        path: '/favoritos',
        element: <Wishlist />,
      },
      {
        path: '/compare',
        element: <Compare />,
      },
      {
        path: '/conta',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />,
          },
          {
            path: 'pedidos',
            children: [
              { path: '', element: <Orders /> },
              { path: 'detalhe/:id', element: <Order /> },
            ],
          },
          {
            path: 'configuracao',
            element: <Setting />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/manutencao',
    element: <Maintenance />,
  },
]

export default router
