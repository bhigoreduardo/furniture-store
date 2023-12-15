/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

import { zipCodeMask } from '../../../../../utils/mask'
import useUser from '../../../../../hooks/use-user'
import Button from '../../button/button'
import Heading from '../../heading'
import { UserEnum } from '../../../../../types/user-type'

export default function CardAddress({ address, to }) {
  const { user: userAuth } = useUser()
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
      <Heading title="Endereço" />
      <div className="flex flex-col gap-6 px-6">
        {address ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Rua: </span>
              {address.street}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Bairro: </span>
              {address.neighborhood}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Número: </span>
              {address.number ?? 'S/N'}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Cidade/UF: </span>
              {address.city}/{address.state}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">CEP: </span>
              {zipCodeMask(address.zipCode)}
            </p>
            {address.complement && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  Complemento:{' '}
                </span>
                {address.complement}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Sem endereço cadastrado, por gentileza, realize a edição do endereço
          </p>
        )}
        {userAuth?._type !== UserEnum.Employee && (
          <Button
            label="Editar endereço"
            className="text-blue-500 !border-blue-500 hover:bg-blue-500 hover:text-white"
            onClick={() => navigate(to)}
          />
        )}
      </div>
    </div>
  )
}
