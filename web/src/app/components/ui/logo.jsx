/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { mergeClassName } from '../../../utils/format'

export default function Logo({ className }) {
  return (
    <Link className={mergeClassName('flex items-center gap-2', className)}>
      <img src="../../../../public/images/icon-logo.svg" alt="Furniture" className="w-12 h-12" />
      <span className="font-bold text-3xl text-white uppercase">Furniture</span>
    </Link>
  )
}
