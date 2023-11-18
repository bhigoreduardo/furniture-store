import { Link } from 'react-router-dom'

import { mobileMask, phoneMask, zipCodeMask } from '../../../../../utils/mask'
import useApp from '../../../../../hooks/use-app'
import Logo from '../../../ui/logo'

export default function ContactNav() {
  const { store } = useApp()

  return (
    <div className="flex flex-col gap-6">
      <Logo />
      <div className="flex flex-col gap-3">
        <div className="flex gap-6">
          <span className="flex flex-col gap-1 text-sm text-gray-400">
            Telefone para contato:
            <a href={`tel:${store?.phone}`} className="text-base text-white">
              {phoneMask(store?.phone)}
            </a>
          </span>
          {store?.whatsApp && (
            <span className="flex flex-col gap-1 text-sm text-gray-400">
              WhatsApp para contato:
              <Link className="text-base text-white">
                {mobileMask(store?.whatsApp)}
              </Link>
            </span>
          )}
        </div>
        <span className="text-sm text-gray-400">
          {store?.address?.street}, {store?.address?.number} -{' '}
          {store?.address?.neighborhood}, {store?.address?.city} -{' '}
          {store?.address?.state}, {zipCodeMask(store?.address?.zipCode)}
          {/* R. Afonso de Freitas, 778 - Paraíso, São Paulo - SP, 04006-052 */}
        </span>
        <Link className="text-base text-white">{store?.contactEmail}</Link>
      </div>
    </div>
  )
}
