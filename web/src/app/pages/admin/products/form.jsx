import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash } from 'phosphor-react'
import { toast } from 'react-toastify'

import { del } from '../../../../libs/fetcher'
import { useProduct } from '../../../../hooks/use-product'
import useApp from '../../../../hooks/use-app'
import Button from '../../../components/ui/button/button'
import Heading from '../../../components/ui/heading'
import FormProducts from '../../../components/ui/form/admin/form-products'
import AlertModal from '../../../components/ui/modal/alert-modal'

export default function Form() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { setIsLoading, setRefetch, isModalOpen, setIsModalOpen } = useApp()
  const data = useProduct(id)
  const handleDelete = async () => {
    const { success } = await del(
      `/products/${id}`,
      {},
      setIsLoading,
      toast,
      setRefetch
    )
    if (success) navigate(-1)
  }

  return (
    <section className="flex-grow flex flex-col">
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDelete()
          setIsModalOpen(false)
        }}
      />
      <div className="flex flex-col gap-6">
        <div className="border border-100 rounded-sm shadow-md pt-2">
          <Heading
            title="Informações"
            btn={
              <div className="flex gap-2">
                {id && (
                  <Button
                    label="Excluir"
                    icon={<Trash size={16} className="text-white" />}
                    className="bg-red-500 text-white hover:bg-red-600 !py-2"
                    onClick={() => setIsModalOpen(true)}
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
        </div>
        <FormProducts data={id && data} />
      </div>
    </section>
  )
}
