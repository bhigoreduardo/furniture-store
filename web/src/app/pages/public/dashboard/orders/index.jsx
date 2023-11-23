import { useFilterOrders } from '../../../../../hooks/use-order'
import { orderColumns } from '../../../../../utils/constants/public'
import FitlerOrder from '../../../../components/ui/filter/filter-order'
import TableData from '../../../../components/ui/table/table-data'

export default function Orders() {
  const { docs, total, pages } = useFilterOrders()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FitlerOrder />
      <TableData
        title="Pedidos recentes"
        columns={orderColumns('/conta/pedidos/detalhe')}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
