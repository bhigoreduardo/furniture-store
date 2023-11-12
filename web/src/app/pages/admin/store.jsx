import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Password, UserGear } from 'phosphor-react'

import useUser from '../../../hooks/use-user'
import Button from '../../components/ui/button/button'
import Heading from '../../components/ui/heading'
import FormStore from '../../components/ui/form/admin/form-store'
import FormAddress from '../../components/ui/form/form-address'
import FormPayment from '../../components/ui/form/admin/form-store/form-payment'
import FormSocial from '../../components/ui/form/admin/form-store/form-social'
import FormPassword from '../../components/ui/form/form-password'

const ACTIVE_ITEM = 'bg-orange-500 text-white'
const INACTIVE_ITEM = 'text-orange-500 !border-orange-200 hover:text-white'

export default function Store() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [isNonAccount, setIsNonAccount] = useState(false)
  const getClassName = (status) => (!status ? ACTIVE_ITEM : INACTIVE_ITEM)
  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex gap-3">
        <Button
          label="Editar conta"
          icon={
            <UserGear
              size={20}
              weight="duotone"
              className="!transition-all !duration-0"
            />
          }
          onClick={() => setIsNonAccount(false)}
          className={`${getClassName(isNonAccount)} hover:bg-orange-600 !py-2`}
        />
        <Button
          label="Editar senha"
          icon={
            <Password
              size={20}
              weight="duotone"
              className="!transition-all !duration-0"
            />
          }
          onClick={() => setIsNonAccount(true)}
          className={`${getClassName(!isNonAccount)} hover:bg-orange-600 !py-2`}
        />
      </div>
      {!isNonAccount ? (
        <>
          <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
            <Heading
              title="Informações"
              btn={
                <Button
                  label="Voltar"
                  icon={<ArrowLeft size={16} className="text-white" />}
                  className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
                  onClick={() => navigate(-1)}
                />
              }
            />
            <FormStore user={user} />
          </div>
          <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
            <Heading title="Endereço" />
            <FormAddress user={user} endPoint="/stores/update" />
          </div>
          <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
            <Heading title="Formas de pagamento" />
            <FormPayment />
          </div>
          <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
            <Heading title="Redes sociais" />
            <FormSocial user={user} endPoint="/stores/update" />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
          <Heading title="Segurança" />
          <FormPassword endPoint="/stores/change-password" />
        </div>
      )}
    </section>
  )
}
