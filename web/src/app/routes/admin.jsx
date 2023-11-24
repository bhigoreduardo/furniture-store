import Layout from '../layouts/admin'

import Auth from '../pages/admin/auth'
import SignUp from '../pages/admin/auth/sign-up'
import GenerateRecoveryPassword from '../pages/admin/auth/generate-recovery-password'
import RecoveryPassword from '../pages/admin/auth/recovery-password'

import Dashboard from '../pages/admin/dashboard'
import Categories from '../pages/admin/categories'
import CategoriesForm from '../pages/admin/categories/form'
import Colors from '../pages/admin/colors'
import ColorsForm from '../pages/admin/colors/form'
import Brands from '../pages/admin/brands'
import BrandsForm from '../pages/admin/brands/form'
import Products from '../pages/admin/products'
import ProductsForm from '../pages/admin/products/form'
import Customers from '../pages/admin/customers'
import CustomersProfile from '../pages/admin/customers/profile'
import CustomersForm from '../pages/admin/customers/form'
import Users from '../pages/admin/users'
import UsersForm from '../pages/admin/users/form'
import Store from '../pages/admin/store'
import Orders from '../pages/admin/orders'
import CustomersOrders from '../pages/admin/customers/orders'
import OrdersDetail from '../pages/admin/customers/orders-detail'
import Offers from '../pages/admin/offers'
import OffersForm from '../pages/admin/offers/form'

const children = [
  {
    path: 'entrar',
    element: <Auth />,
  },
  {
    path: 'recuperar-senha',
    element: <GenerateRecoveryPassword />,
  },
  {
    path: 'redefinir-senha',
    element: <RecoveryPassword />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'categorias',
        children: [
          { path: '', element: <Categories /> },
          { path: 'cadastrar', element: <CategoriesForm /> },
          { path: 'editar/:id', element: <CategoriesForm /> },
        ],
      },
      {
        path: 'cores',
        children: [
          { path: '', element: <Colors /> },
          { path: 'cadastrar', element: <ColorsForm /> },
          { path: 'editar/:id', element: <ColorsForm /> },
        ],
      },
      {
        path: 'marcas',
        children: [
          { path: '', element: <Brands /> },
          { path: 'cadastrar', element: <BrandsForm /> },
          { path: 'editar/:id', element: <BrandsForm /> },
        ],
      },
      {
        path: 'produtos',
        children: [
          { path: '', element: <Products /> },
          { path: 'cadastrar', element: <ProductsForm /> },
          { path: 'editar/:id', element: <ProductsForm /> },
        ],
      },
      {
        path: 'pedidos',
        children: [
          { path: '', element: <Orders /> },
          { path: ':id', element: <OrdersDetail /> },
        ],
      },
    ],
  },
]

const admin = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'clientes',
        children: [
          { path: '', element: <Customers /> },
          { path: 'perfil/:id', element: <CustomersProfile /> },
          { path: 'perfil/:id/editar', element: <CustomersForm /> },
          { path: 'pedidos/:id', element: <CustomersOrders /> },
        ],
      },
      {
        path: 'usuarios',
        children: [
          { path: '', element: <Users /> },
          { path: 'cadastrar', element: <UsersForm /> },
          { path: 'editar/:id', element: <UsersForm /> },
        ],
      },
      {
        path: 'loja',
        element: <Store />,
      },
      {
        path: 'ofertas',
        children: [
          { path: '', element: <Offers /> },
          { path: 'cadastrar', element: <OffersForm /> },
        ],
      },
    ],
  },
]

const router = [
  {
    path: '/admin',
    children: [
      ...children,
      ...admin,
      {
        path: 'cadastrar',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/loja',
    children: children,
  },
]

export default router
