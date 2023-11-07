import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'

import useUser from '../../../../../../hooks/use-user'
import Button from '../../../button/button'
import Heading from '../../../heading'
import FormAddress from './form-address'
import FormProfile from './form-profile'
import FormPassword from './form-password'

export default function FormSetting() {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Dados pessoais"
          btn={
            <Button
              label="Voltar"
              icon={<ArrowLeft size={16} className="text-white" />}
              className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
              onClick={() => navigate(-1)}
            />
          }
        />
        <FormProfile user={user} />
      </div>

      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Endereço" />
        <FormAddress user={user} />
      </div>

      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Alterar senha" />
        <FormPassword />
      </div>
    </div>
  )
}
