import { useLocation } from 'react-router-dom'
import {
  ArrowsCounterClockwise,
  ClockClockwise,
  Gear,
  Heart,
  MapPinLine,
  Notebook,
  ShoppingCartSimple,
  SignOut,
  Stack,
  Storefront,
} from 'phosphor-react'

import { comparePathname } from '../../../../../utils/format'
import useUser from '../../../../../hooks/use-user'
import NavItem from '../../../ui/nav-item'

const ACTIVE_ITEM = 'text-white !bg-orange-500'

export default function Sidebar() {
  const { pathname } = useLocation()
  const { handleUpdateUser } = useUser()
  const path = pathname.split('/')[2]
  const logout = () => handleUpdateUser(null, null)

  return (
    <aside className="w-full max-w-[270px] border border-gray-100 bg-white rounded-sm shadow-md py-2">
      <NavItem
        to="/conta"
        icon={<Stack size={18} weight="duotone" />}
        label="Conta"
        title="Conta"
        className={comparePathname(path, undefined) && ACTIVE_ITEM}
      />
      <NavItem
        to="pedidos"
        icon={<Storefront size={18} />}
        label="Pedidos"
        title="Pedidos"
        className={comparePathname(path, 'pedidos') && ACTIVE_ITEM}
      />
      <NavItem
        to="/rastrear"
        icon={<MapPinLine size={18} />}
        label="Rastrear"
        title="Rastrear"
      />
      <NavItem
        to="/carrinho"
        icon={<ShoppingCartSimple size={18} weight="duotone" />}
        label="Carrinho"
        title="Carrinho"
      />
      <NavItem
        to="/favoritos"
        icon={<Heart size={18} weight="duotone" />}
        label="Favoritos"
        title="Favoritos"
        className={comparePathname(path, 'favoritos') && ACTIVE_ITEM}
      />
      <NavItem
        to="/compare"
        icon={<ArrowsCounterClockwise size={18} weight="duotone" />}
        label="Compare"
        title="Compare"
        className={comparePathname(path, 'compare') && ACTIVE_ITEM}
      />
      <NavItem
        to="endereco"
        icon={<Notebook size={18} weight="duotone" />}
        label="Endereço"
        title="Endereço"
        className={comparePathname(path, 'endereco') && ACTIVE_ITEM}
      />
      <NavItem
        to="historico"
        icon={<ClockClockwise size={18} weight="duotone" />}
        label="Histórico"
        title="Histórico"
        className={comparePathname(path, 'historico') && ACTIVE_ITEM}
      />
      <NavItem
        to="configuracao"
        icon={<Gear size={18} weight="duotone" />}
        label="Configuração"
        title="Configuração"
        className={comparePathname(path, 'configuracao') && ACTIVE_ITEM}
      />
      <NavItem
        to="/"
        icon={<SignOut size={18} />}
        label="Sair"
        className="text-red-500"
        title="Sair"
        onClick={logout}
      />
    </aside>
  )
}
