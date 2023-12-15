import Layout from '../layouts/admin'

import Auth from '../pages/admin/auth'
import SignUp from '../pages/admin/auth/sign-up'
import GenerateRecoveryPassword from '../pages/admin/auth/generate-recovery-password'
import RecoveryPassword from '../pages/admin/auth/recovery-password'

import Dashboard from '../pages/admin/dashboard'
import Customers from '../pages/admin/customers'
import CustomersProfile from '../pages/admin/customers/profile'
import CustomersForm from '../pages/admin/customers/form'
import Categories from '../pages/admin/categories'
import CategoriesForm from '../pages/admin/categories/form'
import Colors from '../pages/admin/colors'
import ColorsForm from '../pages/admin/colors/form'
import Brands from '../pages/admin/brands'
import BrandsForm from '../pages/admin/brands/form'
import Products from '../pages/admin/products'
import ProductsForm from '../pages/admin/products/form'
import Orders from '../pages/admin/orders'
import CustomersOrders from '../pages/admin/customers/orders'
import OrdersDetail from '../pages/admin/customers/orders-detail'
import Offers from '../pages/admin/offers'
import OffersForm from '../pages/admin/offers/form'
import Store from '../pages/admin/store'
import Users from '../pages/admin/users'
import UsersForm from '../pages/admin/users/form'
import UserProfile from '../pages/admin/users/profile'

const children = [
  {
    path: 'cadastrar',
    element: <SignUp />,
  },
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
      {
        path: 'clientes',
        children: [
          { path: '', element: <Customers /> },
          { path: 'perfil/:id', element: <CustomersProfile /> },
          { path: 'pedidos/:id', element: <CustomersOrders /> },
        ],
      },
      {
        path: 'perfil',
        element: <UserProfile />,
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
        path: 'colaboradores',
        children: [
          { path: '', element: <Users /> },
          { path: 'cadastrar', element: <UsersForm /> },
          { path: 'editar/:id', element: <UsersForm /> },
        ],
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

const store = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: 'loja',
        element: <Store />,
      },
      {
        path: 'administradores',
        children: [
          { path: '', element: <Users /> },
          { path: 'cadastrar', element: <UsersForm /> },
          { path: 'editar/:id', element: <UsersForm /> },
        ],
      },
    ],
  },
]

const router = [
  {
    path: '/acesso',
    children: [
      {
        path: 'loja',
        children: [...store, ...children, ...admin],
      },
      {
        path: 'admin',
        children: [...children, ...admin],
      },
      {
        path: 'colaborador',
        children: children,
      },
    ],
  },
]

export default router
