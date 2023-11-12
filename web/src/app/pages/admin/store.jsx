import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'

import useUser from '../../../hooks/use-user'
import Button from '../../components/ui/button/button'
import Heading from '../../components/ui/heading'
import FormStore from '../../components/ui/form/admin/form-store'
import FormAddress from '../../components/ui/form/form-address'
import FormPayment from '../../components/ui/form/admin/form-store/form-payment'
import FormSocial from '../../components/ui/form/admin/form-store/form-social'

export default function Store() {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <section className="flex-grow flex flex-col gap-6">
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
        <FormAddress user={user} isAdmin endPoint={`/stores/update`} />
      </div>
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Formas de pagamento" />
        <FormPayment />
      </div>
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Redes sociais" />
        <FormSocial />
      </div>
    </section>
  )
}
