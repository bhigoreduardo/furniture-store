import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash } from 'phosphor-react'
import { toast } from 'react-toastify'

import { del } from '../../../../libs/fetcher'
import { useCategory } from '../../../../hooks/use-category'
import useApp from '../../../../hooks/use-app'
import Button from '../../../components/ui/button/button'
import FormCategories from '../../../components/ui/form/admin/form-categories'
import Heading from '../../../components/ui/heading'

export default function Form() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setIsLoading } = useApp()
  const data = useCategory(id)
  const handleDelete = async () => {
    await del(`/categories/${id}`, {}, setIsLoading, toast)
  }

  return (
    <section className="flex-grow flex flex-col">
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Informações"
          btn={
            <div className="flex gap-2">
              {id && (
                <Button
                  label="Excluir"
                  icon={<Trash size={16} className="text-white" />}
                  className="bg-red-500 text-white hover:bg-red-600 !py-2"
                  onClick={handleDelete}
                />
              )}
              <Button
                label="Voltar"
                icon={<ArrowLeft size={16} className="text-white" />}
                className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
                onClick={() => navigate(-1)}
              />
            </div>
          }
        />
        <FormCategories data={data} />
      </div>
    </section>
  )
}
