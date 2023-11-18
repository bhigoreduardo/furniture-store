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
import { Link, useLocation } from 'react-router-dom'

import { comparePathname } from '../../../../../utils/format'
import { phoneMask } from '../../../../../utils/mask'
import useApp from '../../../../../hooks/use-app'
import Container from '../../../ui/container'

export default function BottomNav() {
  const { store } = useApp()
  const { pathname } = useLocation()

  return (
    <div className="bg-white border border-gray-300">
      <Container className="flex items-center justify-between py-2">
        <nav className="flex items-center gap-6">
          <button className="flex items-center justify-between gap-2 font-semibold text-gray-900 text-sm px-6 py-3 bg-gray-50">
            Todos produtos
            <CaretDown size={16} className="text-gray-900" />
          </button>

          <Link
            to="/"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <House size={16} weight="duotone" />
            Início
          </Link>
          <Link
            to="/produtos"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/produtos')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <Storefront size={16} weight="duotone" />
            Produtos
          </Link>
          <Link
            to="/rastrear"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/rastrear')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <MapPinLine size={16} weight="duotone" />
            Rastrear
          </Link>
          <Link
            to="/compare"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/compare')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <ArrowsCounterClockwise size={16} weight="duotone" />
            Compare
          </Link>
          <Link
            to="/contato"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/contato')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <Headphones size={16} weight="duotone" />
            Contato
          </Link>
          <Link
            to="/sobre"
            className={`flex items-center gap-1 text-sm ${
              comparePathname(pathname, '/sobre')
                ? 'text-orange-500'
                : 'text-gray-600'
            } hover:text-orange-600 duration-300 ease-in-out`}
          >
            <Note size={16} weight="duotone" />
            Sobre
          </Link>
        </nav>

        <a
          href={`tel:${store?.whatsApp}`}
          className="flex items-center gap-2 text-gray-900 text-sm"
        >
          <PhoneCall size={18} />
          {phoneMask(store?.phone)}
        </a>
      </Container>
    </div>
  )
}
