import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'

import { get } from '../../../../libs/fetcher'
import Button from '../../../components/ui/button/button'
import Heading from '../../../components/ui/heading'
import FormBrands from '../../../components/ui/form/admin/form-brands'

export default function Form() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const getBrand = async () => {
    const data = await get(`/brands/${id}`)
    setData(data)
  }
  useEffect(() => {
    if (id) getBrand()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="flex-grow flex flex-col">
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
        <FormBrands data={data} />
      </div>
    </section>
  )
}
