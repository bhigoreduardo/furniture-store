import { useFilterOrders } from '../../../hooks/admin/use-order'
import { orderColumns } from '../../../utils/constants/admin'
import FitlerOrder from '../../components/ui/filter/admin/filter-order'
import TableData from '../../components/ui/table/table-data'

export default function Orders() {
  const { docs, total, pages } = useFilterOrders()
  console.log(docs)

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
