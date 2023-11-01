import { Stack, UserList, Tag, PaintBrush, Lifebuoy, Armchair, ArchiveBox, ChatDots, Storefront, UsersThree, Layout, CurrencyCircleDollar, SignOut } from 'phosphor-react'

import NavItem from '../../ui/nav-item'

export default function Sidebar() {
  return (
    <aside className="w-full max-w-[270px] border border-gray-100 bg-white rounded-sm shadow-md py-2">
      <NavItem to="" icon={<Stack size={18} />} label="Painel" />
      <NavItem to="clientes" icon={<UserList size={18} />} label="Clientes" />
      <NavItem to="categorias" icon={<Tag size={18} />} label="Categorias" />
      <NavItem to="cores" icon={<PaintBrush size={18} />} label="Cores" />
      <NavItem to="marcas" icon={<Lifebuoy size={18} />} label="Marcas" />
      <NavItem to="produtos" icon={<Armchair size={18} />} label="Produtos" />
      <NavItem to="pedidos" icon={<ArchiveBox size={18} />} label="Pedidos" />
      <NavItem to="mensagens" icon={<ChatDots size={18} />} label="Mensagens" />
      <NavItem to="loja" icon={<Storefront size={18} />} label="Loja" />
      <NavItem to="usuarios" icon={<UsersThree size={18} />} label="Usuários" />
      <NavItem to="layout" icon={<Layout size={18} />} label="Layout" />
      <NavItem to="ofertas" icon={<CurrencyCircleDollar size={18} />} label="Ofertas/Cupons" />
      <NavItem icon={<SignOut size={18} />} label="Sair" />
    </aside>
  )
}
