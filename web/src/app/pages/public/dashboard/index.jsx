import { Link, useNavigate } from 'react-router-dom'

import useUser from '../../../../hooks/use-user'
import Heading from '../../../components/ui/heading'
import Button from '../../../components/ui/button/button'
import CardOverview from '../../../components/ui/card/card-overview'
import { Package, Receipt, Rocket } from 'phosphor-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const address = user?.address

  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h4 className="text-xl text-gray-900">Olá, {user.name}</h4>
        <p className="text-sm text-gray-700">
          No painel da sua conta. você pode verificar e visualizar facilmente
          seus{' '}
          <Link to="pedidos" className="text-blue-500">
            pedidos
          </Link>{' '}
          recentes, gerenciar seus{' '}
          <Link to="endereco" className="text-blue-500">
            endereços
          </Link>{' '}
          de envio e cobrança e editar sua{' '}
          <Link to="configuracao" className="text-blue-500">
            senha
          </Link>{' '}
          e configurações da{' '}
          <Link to="configuracao" className="text-blue-500">
            conta
          </Link>
          .
        </p>
      </div>

      <div className="flex gap-6">
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
                  {user.name}
                </span>
                <p className="text-sm text-gray-600">{user.cpf}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Email: </span>
                {user.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">WhatsApp: </span>
                {user.whatsApp}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">
                  Membro desde:{' '}
                </span>
                {user.createdAt}
              </p>
            </div>
            <Button
              label="Editar conta"
              className="text-blue-500 !border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => navigate('configuracao')}
            />
          </div>
        </div>

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
                  <span className="font-semibold text-gray-900">
                    Cidade/UF:{' '}
                  </span>
                  {address.city}-{address.state}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">CEP: </span>
                  {address.zipCode}
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
                Sem endereço cadastrado, por gentileza, realize a edição de seu
                endereço
              </p>
            )}
            <Button
              label="Editar endereço"
              className="text-blue-500 !border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => navigate('configuracao')}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <CardOverview
            icon={<Rocket size={20} className="text-blue-500" />}
            value="154"
            description="Total Pedidos"
            className="bg-blue-50"
          />
          <CardOverview
            icon={<Receipt size={20} className="text-orange-500" />}
            value="154"
            description="Pedidos Pendetes"
            className="bg-orange-50"
          />
          <CardOverview
            icon={<Package size={20} className="text-green-500" />}
            value="154"
            description="Pedidos Entregue"
            className="bg-green-50"
          />
        </div>
      </div>
    </section>
  )
}
