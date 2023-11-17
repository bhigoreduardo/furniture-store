import { useFilterOrders } from '../../../hooks/admin/use-order'
import { orderColumns } from '../../../utils/constants/admin'
import FitlerOrder from '../../components/ui/filter/filter-order'
import TableData from '../../components/ui/table/table-data'

export default function Orders() {
  const { docs, total, pages } = useFilterOrders()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FitlerOrder />
      <TableData
        title="Pedidos"
        columns={orderColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
