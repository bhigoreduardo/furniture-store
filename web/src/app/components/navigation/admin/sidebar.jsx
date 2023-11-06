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
} from 'phosphor-react'

import { comparePathname } from '../../../../utils/format'
import useAdmin from '../../../../hooks/use-admin'
import NavItem from '../../ui/nav-item'

const ACTIVE_ITEM = 'text-white !bg-orange-500'

export default function Sidebar() {
  const { pathname } = useLocation()
  const { isSidebar } = useAdmin()
  const isStore = pathname.split('/')[1] === 'loja'
  const path = pathname.split('/')[2]

  return (
    <aside
      className={`w-full ${
        isSidebar ? 'max-w-[270px]' : 'max-w-[50px]'
      } border border-gray-100 bg-white rounded-sm shadow-md py-2`}
    >
      <NavItem
        to="painel"
        icon={<Stack size={18} className="!transition-all !duration-0" />}
        label="Painel"
        title="Painel"
        className={comparePathname(path, 'painel') && ACTIVE_ITEM}
      />
      {!isStore && (
        <NavItem
          to="clientes"
          icon={<UserList size={18} className="!transition-all !duration-0" />}
          label="Clientes"
          title="Clientes"
          className={comparePathname(path, 'clientes') && ACTIVE_ITEM}
        />
      )}
      <NavItem
        to="categorias"
        icon={<Tag size={18} className="!transition-all !duration-0" />}
        label="Categorias"
        title="Categorias"
        className={comparePathname(path, 'categorias') && ACTIVE_ITEM}
      />
      <NavItem
        to="cores"
        icon={<PaintBrush size={18} className="!transition-all !duration-0" />}
        label="Cores"
        title="Cores"
        className={comparePathname(path, 'cores') && ACTIVE_ITEM}
      />
      <NavItem
        to="marcas"
        icon={<Lifebuoy size={18} className="!transition-all !duration-0" />}
        label="Marcas"
        title="Marcas"
        className={comparePathname(path, 'marcas') && ACTIVE_ITEM}
      />
      <NavItem
        to="produtos"
        icon={<Armchair size={18} className="!transition-all !duration-0" />}
        label="Produtos"
        title="Produtos"
        className={comparePathname(path, 'produtos') && ACTIVE_ITEM}
      />
      <NavItem
        to="pedidos"
        icon={<ArchiveBox size={18} className="!transition-all !duration-0" />}
        label="Pedidos"
        title="Pedidos"
        className={comparePathname(path, 'pedidos') && ACTIVE_ITEM}
      />
      <NavItem
        to="mensagens"
        icon={<ChatDots size={18} className="!transition-all !duration-0" />}
        label="Mensagens"
        title="Mensagens"
        className={comparePathname(path, 'mensagens') && ACTIVE_ITEM}
      />
      {!isStore && (
        <>
          <NavItem
            to="loja"
            icon={
              <Storefront size={18} className="!transition-all !duration-0" />
            }
            label="Loja"
            title="Loja"
            className={comparePathname(path, 'lojq') && ACTIVE_ITEM}
          />
          <NavItem
            to="usuarios"
            icon={
              <UsersThree size={18} className="!transition-all !duration-0" />
            }
            label="Usuários"
            title="Usuários"
            className={comparePathname(path, 'usuarios') && ACTIVE_ITEM}
          />
          <NavItem
            to="layout"
            icon={<Layout size={18} className="!transition-all !duration-0" />}
            label="Layout"
            title="Layout"
            className={comparePathname(path, 'layout') && ACTIVE_ITEM}
          />
          <NavItem
            to="ofertas"
            icon={
              <CurrencyCircleDollar
                size={18}
                className="!transition-all !duration-0"
              />
            }
            label="Ofertas/Cupons"
            title="Ofertas/Cupons"
            className={comparePathname(path, 'ofertas') && ACTIVE_ITEM}
          />
        </>
      )}
      <NavItem
        icon={<SignOut size={18} className="!transition-all !duration-0" />}
        label="Sair"
        className="text-red-500"
        title="Sair"
      />
    </aside>
  )
}
