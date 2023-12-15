import { useParams } from 'react-router-dom'
import { Printer, XCircle } from 'phosphor-react'
import { toast } from 'react-toastify'

import { patch } from '../../../../libs/fetcher'
import { useOrder } from '../../../../hooks/admin/use-order'
import { orderStatus as statusType } from '../../../../types/product-type'
import { sanitizeSelectData } from '../../../../utils/format'
import { OrderStatusEnumType } from '../../../../types/enum-type'
import useApp from '../../../../hooks/use-app'
import Heading from '../../../components/ui/heading'
import Button from '../../../components/ui/button/button'
import FormOrder from '../../../components/ui/form/form-order'
import Select from '../../../components/ui/input/select'
import AlertModal from '../../../components/ui/modal/alert-modal'

export default function OrdersDetail() {
  const { id } = useParams()
  const { setIsLoading, isModalOpen, setIsModalOpen, setRefetch } = useApp()
  const data = useOrder(id)
  const orderStatus = data?.status?.slice(-1)[0]?.history
  const statusTypeParsed = sanitizeSelectData(statusType, ['canceled'])
  const handleStatus = async (status) => {
    if (
      orderStatus === OrderStatusEnumType.Delivered ||
      orderStatus === OrderStatusEnumType.Canceled
    )
      return
    await patch(
      `/orders/${id}/change-status`,
      { status },
      setIsLoading,
      toast,
      setRefetch
    )
  }

  return (
    <section className="flex-grow flex flex-col gap-6">
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleStatus(OrderStatusEnumType.Canceled)
          setIsModalOpen(false)
        }}
      />
      {orderStatus !== OrderStatusEnumType.Delivered &&
        orderStatus !== OrderStatusEnumType.Canceled && (
          <Select
            id="status"
            name="status"
            placeholder="Status"
            data={statusTypeParsed}
            value={orderStatus}
            onChange={(e) => handleStatus(e.target.value)}
            className="w-fit"
          />
        )}

      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Detalhe do pedido"
          btn={
            <div className="flex items-center gap-2">
              {orderStatus !== OrderStatusEnumType.Delivered &&
                orderStatus !== OrderStatusEnumType.Canceled && (
                  <Button
                    label="Cancelar"
                    icon={<XCircle size={16} className="text-white" />}
                    className="bg-red-500 text-white hover:bg-red-600 !py-2"
                    onClick={() => setIsModalOpen(true)}
                  />
                )}
              <Button
                label="Imprimir"
                icon={<Printer size={16} className="text-white" />}
                className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
              />
            </div>
          }
        />
        <FormOrder data={data} isAdmin />
      </div>
    </section>
  )
}
