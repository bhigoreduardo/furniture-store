import { customerColumns } from '../../../../utils/constants/admin'
import { useCustomers } from '../../../../hooks/admin/use-customer'
import FilterCustomer from '../../../components/ui/filter/admin/filter-customer'
import TableData from '../../../components/ui/table/table-data'

export default function Customers() {
  const { docs, total, pages } = useCustomers()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterCustomer />
      <TableData
        title="Clientes"
        columns={customerColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
