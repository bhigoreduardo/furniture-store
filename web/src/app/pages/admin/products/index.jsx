import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { productColumns } from '../../../../utils/constants/admin'
import { useFilterProducts } from '../../../../hooks/use-product'
import Button from '../../../components/ui/button/button'
import FilterProduct from '../../../components/ui/filter/admin/filter-product'
import TableData from '../../../components/ui/table/table-data'

export default function Products() {
  const navigate = useNavigate()
  const { docs, total, pages } = useFilterProducts()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterProduct />
      <TableData
        title="Produtos"
        btn={
          <Button
            label="Adicionar"
            icon={<PlusCircle size={16} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
            onClick={() => navigate('cadastrar')}
          />
        }
        columns={productColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
