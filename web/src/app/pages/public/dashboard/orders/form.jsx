import { ArrowLeft } from 'phosphor-react'
import { useNavigate, useParams } from 'react-router-dom'

import { useOrder } from '../../../../../hooks/use-order'
import FormOrder from '../../../../components/ui/form/form-order'
import Heading from '../../../../components/ui/heading'
import Button from '../../../../components/ui/button/button'

export default function Order() {
  const navigate = useNavigate()
  const { id } = useParams()
  const data = useOrder(id)

  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Detalhe do pedido"
          btn={
            <Button
              label="Voltar"
              icon={<ArrowLeft size={16} className="text-white" />}
              className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
              onClick={() => navigate(-1)}
            />
          }
        />
        <FormOrder data={data} />
      </div>
    </section>
  )
}
