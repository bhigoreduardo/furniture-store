import { Link } from 'react-router-dom'

import Logo from '../../../ui/logo'

export default function ContactNav() {
  return (
    <div className="flex flex-col gap-6">
      <Logo />
      <div className="flex flex-col gap-3">
        <span className="flex flex-col gap-1 text-sm text-gray-400">
          Telefone para contato:
          <Link className="text-base text-white">(11) 9 9753-3598</Link>
        </span>
        <span className="text-sm text-gray-400">
          R. Afonso de Freitas, 778 - Paraíso, São Paulo - SP, 04006-052
        </span>
        <Link className="text-base text-white">furniture@contato.com</Link>
      </div>
    </div>
  )
}
