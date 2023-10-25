import { ArrowRight } from 'phosphor-react'

import Button from '../../../ui/button/button'
import FooterLink from './footer-link'

export default function CategoryNav() {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-semibold text-white text-base uppercase">Categorias</h4>
      <div className="flex flex-col gap-2">
        <FooterLink label="Cadeiras" />
        <FooterLink label="Mesas" />
        <FooterLink label="Camas" />
        <FooterLink label="Armários" />
        <FooterLink label="Decorações" />
        <Button
          label="Todos"
          icon={<ArrowRight size={16} className="text-yellow-500" />}
          className="normal-case !justify-start !gap-1 text-yellow-500 text-sm !p-0"
        />
      </div>
    </div>
  )
}
