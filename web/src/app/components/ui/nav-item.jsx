/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { mergeClassName } from '../../../utils/format'
import useAdmin from '../../../hooks/use-admin'

export default function NavItem({ to, title, icon, label, className, ...props }) {
  const { isSidebar } = useAdmin()

  return (
    <Link
      title={title}
      to={to}
      className={mergeClassName(
        `flex items-center gap-4 text-sm text-gray-600 bg-white px-4 py-2 hover:bg-orange-500 hover:text-white !transition-all !duration-0 `,
        className
      )}
      {...props}
    >
      {icon}
      {isSidebar && <span>{label}</span>}
    </Link>
  )
}
