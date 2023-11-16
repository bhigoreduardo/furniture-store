/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

import { cpfMask, mobileMask } from '../../../../../utils/mask'
import { optionsFullLocaleDate } from '../../../../../utils/format'
import Button from '../../button/button'
import Heading from '../../heading'

export default function CardProfile({ user, to }) {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
      <Heading title="Informações pessoais" />
      <div className="flex flex-col gap-6 px-6">
        <div className="flex gap-4">
          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-base-text-gray-900">
              {user?.name}
            </span>
            <p className="text-sm text-gray-600">{cpfMask(user?.cpf)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Email: </span>
            {user?.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">WhatsApp: </span>
            {mobileMask(user?.whatsApp)}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Membro desde: </span>

            {new Date(user?.createdAt).toLocaleDateString(
              'pt-BR',
              optionsFullLocaleDate(false)
            )}
          </p>
        </div>
        <Button
          label="Editar conta"
          className="text-blue-500 !border-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={() => navigate(to)}
        />
      </div>
    </div>
  )
}
