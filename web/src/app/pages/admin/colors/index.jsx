import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { brandColumns } from '../../../../utils/constants/admin'
import { useColors } from '../../../../hooks/use-color'
import useFilter from '../../../../hooks/use-filter'
import Button from '../../../components/ui/button/button'
import Filter from '../../../components/ui/filter/admin/filter'
import TableData from '../../../components/ui/table/table-data'

export default function Colors() {
  const navigate = useNavigate()
  const { setTotalCount, setTotalPage } = useFilter()
  const { docs, total, pages } = useColors()
  setTotalCount(total)
  setTotalPage(pages)

  return (
    <section className="flex-grow flex flex-col gap-6">
      <Filter />
      <TableData
        title="Cores"
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
      />
    </section>
  )
}
