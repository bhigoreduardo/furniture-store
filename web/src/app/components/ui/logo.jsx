import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link className="flex items-center gap-2">
      <img src="images/icon-logo.svg" alt="Furniture" className="w-12 h-12" />
      <span className="font-bold text-3xl text-white uppercase">Furniture</span>
    </Link>
  )
}
