import { CaretRight, House } from 'phosphor-react'
import { Link } from 'react-router-dom'

import Container from './container'

export default function Breadcrumb() {
  return (
    <article className="bg-gray-50">
      <Container className="flex items-center gap-4 py-6">
        <Link className="flex items-center gap-1 text-sm text-gray-600">
          <House size={16} weight="duotone" />
          Início
        </Link>
        <CaretRight size={12} className="text-gray-600" />
        <Link className="flex items-center gap-1 text-sm text-gray-600">
          Produtos
        </Link>
        <CaretRight size={12} className="text-gray-600" />
        <Link className="flex items-center gap-1 text-sm text-gray-600">
          Cadeiras
        </Link>
        <CaretRight size={12} className="text-gray-600" />
        <Link className="flex items-center gap-1 text-sm text-blue-500">
          Cadeira Meryl Lounge
        </Link>
      </Container>
    </article>
  )
}
