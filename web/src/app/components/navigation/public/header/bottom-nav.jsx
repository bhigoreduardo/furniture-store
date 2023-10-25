import {
  ArrowsCounterClockwise,
  CaretDown,
  Headphones,
  House,
  MapPinLine,
  Note,
  PhoneCall,
  Storefront,
} from 'phosphor-react'
import { Link } from 'react-router-dom'

import Container from '../../../ui/container'

export default function BottomNav() {
  return (
    <div className="bg-white border border-gray-300">
      <Container className="flex items-center justify-between py-2">
        <nav className="flex items-center gap-6">
          <button className="flex items-center justify-between gap-2 font-semibold text-gray-900 text-sm px-6 py-3 bg-gray-50">
            Todos produtos
            <CaretDown size={16} className="text-gray-900" />
          </button>

          <Link className="flex items-center gap-1 text-sm text-orange-500">
            <House size={16} />
            Início
          </Link>
          <Link className="flex items-center gap-1 text-sm text-gray-600">
            <Storefront size={16} />
            Loja
          </Link>
          <Link className="flex items-center gap-1 text-sm text-gray-600">
            <MapPinLine size={16} />
            Rastrear
          </Link>
          <Link className="flex items-center gap-1 text-sm text-gray-600">
            <ArrowsCounterClockwise size={16} />
            Compare
          </Link>
          <Link className="flex items-center gap-1 text-sm text-gray-600">
            <Headphones size={16} />
            Contato
          </Link>
          <Link className="flex items-center gap-1 text-sm text-gray-600">
            <Note size={16} />
            Sobre
          </Link>
        </nav>

        <button className="flex items-center gap-2 text-gray-900 text-sm">
          <PhoneCall size={18} />
          (11) 9 9980-1902
        </button>
      </Container>
    </div>
  )
}
