import { useParams, useNavigate } from 'react-router-dom'
import { Package, Receipt, Rocket, ArrowRight } from 'phosphor-react'

import { useCustomer } from '../../../../hooks/admin/use-customer'
import { orderColumns } from '../../../../utils/constants/public'
import { OrderStatusEnumType } from '../../../../types/enum-type'
import CardOverview from '../../../components/ui/card/card-overview'
import CardAddress from '../../../components/ui/card/customer/card-address'
import CardProfile from '../../../components/ui/card/customer/card-profile'
import TableData from '../../../components/ui/table/table-data'
import Button from '../../../components/ui/button/button'

export default function Profile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const customer = useCustomer(id)
  const address = customer.address

  return (
    <section className="flex-grow flex flex-col gap-6">
      <div className="flex gap-6">
        <CardProfile user={customer} to="editar" />
        <CardAddress address={address} to="editar" />
        <div className="flex-1 flex flex-col gap-6">
          <CardOverview
            icon={<Rocket size={20} className="text-blue-500" />}
            value={customer?.orders?.length}
            description="Total Pedidos"
            className="bg-blue-50"
          />
          <CardOverview
            icon={<Receipt size={20} className="text-orange-500" />}
            value={
              customer?.orders?.filter(
                (item) =>
                  item.status?.slice(-1)[0]?.history ===
                  OrderStatusEnumType.Pending
              )?.length
            }
            description="Pedidos Pendetes"
            className="bg-orange-50"
          />
          <CardOverview
            icon={<Package size={20} className="text-green-500" />}
            value={
              customer?.orders?.filter(
                (item) =>
                  item.status?.slice(-1)[0]?.history ===
                  OrderStatusEnumType.Delivered
              )?.length
            }
            description="Pedidos Entregue"
            className="bg-green-50"
          />
        </div>
      </div>

      <TableData
        title="Pedidos recentes"
        btn={
          <Button
            label="Vê todos"
            icon={<ArrowRight size={14} />}
            className="!gap-1 font-semibold text-sm text-orange-500 hover:bg-orange-500 hover:text-white !py-2 normal-case"
            onClick={() => navigate(`/admin/clientes/pedidos/${id}`)}
          />
        }
        columns={orderColumns('/admin/pedidos')}
        data={customer?.orders}
      />
    </section>
  )
}
