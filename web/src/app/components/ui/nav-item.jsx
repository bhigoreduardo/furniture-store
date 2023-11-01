/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { mergeClassName } from '../../../utils/format'

export default function NavItem({ to, icon, label, className }) {
  const { pathname } = useLocation()
  return (
    <Link
      to={`/${pathname.split('/')[1]}/${to}`}
      className={mergeClassName(
        `flex items-center gap-4 text-sm px-4 py-2 hover:bg-orange-500 hover:text-white ${
          pathname.split('/')[2] === label.toLowerCase() ||
          (pathname.split('/')[2] === '' && label === 'Painel')
            ? 'text-white bg-orange-500'
            : 'text-gray-600 bg-white'
        }`,
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
