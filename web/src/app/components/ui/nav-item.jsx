/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'

import { mergeClassName } from '../../../utils/format'
import useAdmin from '../../../hooks/use-admin'

export default function NavItem({ to, title, icon, label, className }) {
  const { pathname } = useLocation()
  const { isSidebar } = useAdmin()

  return (
    <Link
      title={title}
      to={`/${pathname.split('/')[1]}/${to}`}
      className={mergeClassName(
        `flex items-center gap-4 text-sm px-4 py-2 hover:bg-orange-500 hover:text-white !transition-all !duration-0 ${
          pathname.split('/')[2] === label.toLowerCase() ||
          (pathname.split('/')[2] === '' && label === 'Painel')
            ? 'text-white bg-orange-500'
            : 'text-gray-600 bg-white'
        }`,
        className
      )}
    >
      {icon}
      {isSidebar && <span>{label}</span>}
    </Link>
  )
}
