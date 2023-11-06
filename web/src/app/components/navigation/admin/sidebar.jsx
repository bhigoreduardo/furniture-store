import { useLocation } from 'react-router-dom'
import { Stack, UserList, Tag, PaintBrush, Lifebuoy, Armchair, ArchiveBox, ChatDots, Storefront, UsersThree, Layout, CurrencyCircleDollar, SignOut } from 'phosphor-react'

import useAdmin from '../../../../hooks/use-admin'
import NavItem from '../../ui/nav-item'

export default function Sidebar() {
  const { pathname } = useLocation()
  const { isSidebar } = useAdmin()
  const isStore = pathname.split('/')[1] === 'loja'

  return (
    <aside className={`w-full ${isSidebar ? 'max-w-[270px]' : 'max-w-[50px]'} border border-gray-100 bg-white rounded-sm shadow-md py-2`}>
      <NavItem to="" icon={<Stack size={18} className="!transition-all !duration-0" />} label="Painel" title="Painel" />
      {!isStore && <NavItem to="clientes" icon={<UserList size={18} className="!transition-all !duration-0" />} label="Clientes" title="Clientes" />}
      <NavItem to="categorias" icon={<Tag size={18} className="!transition-all !duration-0" />} label="Categorias" title="Categorias" />
      <NavItem to="cores" icon={<PaintBrush size={18} className="!transition-all !duration-0" />} label="Cores" title="Cores" />
      <NavItem to="marcas" icon={<Lifebuoy size={18} className="!transition-all !duration-0" />} label="Marcas" title="Marcas" />
      <NavItem to="produtos" icon={<Armchair size={18} className="!transition-all !duration-0" />} label="Produtos" title="Produtos" />
      <NavItem to="pedidos" icon={<ArchiveBox size={18} className="!transition-all !duration-0" />} label="Pedidos" title="Pedidos" />
      <NavItem to="mensagens" icon={<ChatDots size={18} className="!transition-all !duration-0" />} label="Mensagens" title="Mensagens" />
      {!isStore && 
      (<>
        <NavItem to="loja" icon={<Storefront size={18} className="!transition-all !duration-0" />} label="Loja" title="Loja" />
        <NavItem to="usuarios" icon={<UsersThree size={18} className="!transition-all !duration-0" />} label="Usuários" title="Usuários" />
        <NavItem to="layout" icon={<Layout size={18} className="!transition-all !duration-0" />} label="Layout" title="Layout" />
        <NavItem to="ofertas" icon={<CurrencyCircleDollar size={18} className="!transition-all !duration-0" />} label="Ofertas/Cupons" title="Ofertas/Cupons" />
      </>)}
      <NavItem icon={<SignOut size={18} className="!transition-all !duration-0" />} label="Sair" className="text-red-500" title="Sair" />
    </aside>
  )
}
