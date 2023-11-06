import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'

import Button from '../../../components/ui/button/button'
import Heading from '../../../components/ui/heading'
import FormProducts from '../../../components/ui/form/admin/form-products'

export default function Form() {
  const navigate = useNavigate()

  return (
    <section className="flex-grow flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="border border-100 rounded-sm shadow-md pt-2">
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
        </div>
        <FormProducts />
      </div>
    </section>
  )
}
