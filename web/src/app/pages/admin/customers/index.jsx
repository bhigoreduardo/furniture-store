import { customerColumns } from '../../../../utils/constants/admin'
import { useCustomers } from '../../../../hooks/use-customer'
import useFilter from '../../../../hooks/use-filter'
import FilterCustomer from '../../../components/ui/filter/admin/filter-customer'
import TableData from '../../../components/ui/table/table-data'

export default function Customers() {
  const { setTotalCount, setTotalPage } = useFilter()
  const { docs, total, pages } = useCustomers()
  setTotalCount(total)
  setTotalPage(pages)
  
  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterCustomer />
      <TableData title="Clientes" columns={customerColumns} data={docs} />
    </section>
  )
}
