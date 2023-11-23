import { useParams } from 'react-router-dom'

import { orderColumns } from '../../../../utils/constants/public'
import { useFilterCustomerOrders } from '../../../../hooks/admin/use-order'
import FitlerOrder from '../../../components/ui/filter/filter-order'
import TableData from '../../../components/ui/table/table-data'

export default function Orders() {
  const { id } = useParams()
  const { docs, total, pages } = useFilterCustomerOrders(id)

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FitlerOrder />
      <TableData
        title="Pedidos"
        columns={orderColumns('/admin/pedidos')}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
