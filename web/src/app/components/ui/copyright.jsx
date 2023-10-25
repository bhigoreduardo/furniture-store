import { Heart } from 'phosphor-react'
import { Link } from 'react-router-dom'

import Container from './container'

export default function Copyright() {
  return (
    <article className="bg-gray-900 border-t border-gray-600">
      <Container className="flex justify-center py-6">
        <span className="flex items-center gap-1 text-sm text-gray-300">
          Furniture - eCommerce &copy; {new Date().getFullYear()} | Todos os
          direitos reservados. Desenvolvido com
          <Heart className="text-red-500" /> por
          <Link>Higor Eduardo</Link>
        </span>
      </Container>
    </article>
  )
}
