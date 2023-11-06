/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

import { mergeClassName } from '../../../utils/format'
import useAdmin from '../../../hooks/use-admin'

export default function Logo({ className }) {
  const { isSidebar } = useAdmin()

  return (
    <Link className={mergeClassName('flex items-center gap-2', className)}>
      <img
        src="../../../../public/images/icon-logo.svg"
        alt="Furniture"
        className="w-12 h-12"
      />
      {isSidebar && (
        <span className="font-bold text-3xl text-white uppercase">
          Furniture
        </span>
      )}
    </Link>
  )
}
