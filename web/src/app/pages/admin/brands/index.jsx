import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { brandColumns } from '../../../../utils/constants/admin'
import { useFilterBrands } from '../../../../hooks/use-brand'
import Button from '../../../components/ui/button/button'
import Filter from '../../../components/ui/filter/admin/filter'
import TableData from '../../../components/ui/table/table-data'

export default function Brands() {
  const navigate = useNavigate()
  const { docs, total, pages } = useFilterBrands()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <Filter />
      <TableData
        title="Marcas"
        btn={
          <Button
            label="Adicionar"
            icon={<PlusCircle size={16} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
            onClick={() => navigate('cadastrar')}
          />
        }
        columns={brandColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
