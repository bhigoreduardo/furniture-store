import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { categoryColumns } from '../../../../utils/constants/admin'
import { useCategories } from '../../../../hooks/use-category'
import useFilter from '../../../../hooks/use-filter'
import TableData from '../../../components/ui/table/table-data'
import Filter from '../../../components/ui/filter/admin/filter'
import Button from '../../../components/ui/button/button'

export default function Categories() {
  const navigate = useNavigate()
  const { setTotalCount, setTotalPage } = useFilter()
  const { docs, total, pages } = useCategories()
  setTotalCount(total)
  setTotalPage(pages)

  return (
    <section className="flex-grow flex flex-col gap-6">
      <Filter />
      <TableData
        title="Categorias"
        btn={
          <Button
            label="Adicionar"
            icon={<PlusCircle size={16} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
            onClick={() => navigate('cadastrar')}
          />
        }
        columns={categoryColumns}
        data={docs}
      />
    </section>
  )
}
