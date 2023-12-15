import { useLocation } from 'react-router-dom'
import {
  Stack,
  UserList,
  Tag,
  PaintBrush,
  Lifebuoy,
  Armchair,
  ArchiveBox,
  ChatDots,
  Storefront,
  UsersThree,
  Layout,
  CurrencyCircleDollar,
  SignOut,
  UserCircleGear,
  IdentificationCard,
} from 'phosphor-react'

import { comparePathname } from '../../../../utils/format'
import useAdmin from '../../../../hooks/use-admin'
import NavItem from '../../ui/nav-item'

const ACTIVE_ITEM = 'text-white !bg-orange-500'

export default function Sidebar() {
  const { pathname } = useLocation()
  const { isSidebar } = useAdmin()
  const isAdmin = pathname.split('/')[2] === 'admin'
  const isStore = pathname.split('/')[2] === 'loja'
  const path = pathname.split('/')[3]

  return (
    <aside
      className={`w-full ${
        isSidebar ? 'max-w-[270px]' : 'max-w-[50px]'
      } border border-gray-100 bg-white rounded-sm shadow-md py-2 duration-300 ease-in-out`}
    >
      <NavItem
        to=""
        icon={<Stack size={18} />}
        label="Painel"
        title="Painel"
        className={comparePathname(path, undefined) && ACTIVE_ITEM}
      />
      <NavItem
        to="clientes"
        icon={<UserList size={18} />}
        label="Clientes"
        title="Clientes"
        className={comparePathname(path, 'clientes') && ACTIVE_ITEM}
      />
      <NavItem
        to="categorias"
        icon={<Tag size={18} />}
        label="Categorias"
        title="Categorias"
        className={comparePathname(path, 'categorias') && ACTIVE_ITEM}
      />
      <NavItem
        to="cores"
        icon={<PaintBrush size={18} />}
        label="Cores"
        title="Cores"
        className={comparePathname(path, 'cores') && ACTIVE_ITEM}
      />
      <NavItem
        to="marcas"
        icon={<Lifebuoy size={18} />}
        label="Marcas"
        title="Marcas"
        className={comparePathname(path, 'marcas') && ACTIVE_ITEM}
      />
      <NavItem
        to="produtos"
        icon={<Armchair size={18} />}
        label="Produtos"
        title="Produtos"
        className={comparePathname(path, 'produtos') && ACTIVE_ITEM}
      />
      <NavItem
        to="pedidos"
        icon={<ArchiveBox size={18} />}
        label="Pedidos"
        title="Pedidos"
        className={comparePathname(path, 'pedidos') && ACTIVE_ITEM}
      />
      <NavItem
        to="mensagens"
        icon={<ChatDots size={18} />}
        label="Mensagens"
        title="Mensagens"
        className={comparePathname(path, 'mensagens') && ACTIVE_ITEM}
      />
      <NavItem
        to="layout"
        icon={<Layout size={18} />}
        label="Layout"
        title="Layout"
        className={comparePathname(path, 'layout') && ACTIVE_ITEM}
      />
      <NavItem
        to="ofertas"
        icon={<CurrencyCircleDollar size={18} />}
        label="Ofertas/Cupons"
        title="Ofertas/Cupons"
        className={comparePathname(path, 'ofertas') && ACTIVE_ITEM}
      />
      {isStore && (
        <>
          <NavItem
            to="loja"
            icon={<Storefront size={18} />}
            label="Loja"
            title="Loja"
            className={comparePathname(path, 'loja') && ACTIVE_ITEM}
          />
          <NavItem
            to="administradores"
            icon={<UserCircleGear size={18} />}
            label="Administradores"
            title="Administradores"
            className={comparePathname(path, 'administradores') && ACTIVE_ITEM}
          />
        </>
      )}
      {(isStore || isAdmin) && (
        <>
          <NavItem
            to="colaboradores"
            icon={<UsersThree size={18} />}
            label="Colaboradores"
            title="Colaboradores"
            className={comparePathname(path, 'colaboradores') && ACTIVE_ITEM}
          />
        </>
      )}
      {!isStore && (
        <>
          <NavItem
            to="perfil"
            icon={<IdentificationCard size={18} />}
            label="Perfil"
            title="Perfil"
            className={comparePathname(path, 'perfil') && ACTIVE_ITEM}
          />
        </>
      )}
      <NavItem
        icon={<SignOut size={18} />}
        label="Sair"
        className="text-red-500"
        title="Sair"
      />
    </aside>
  )
}
