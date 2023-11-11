import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { colorColumns } from '../../../../utils/constants/admin'
import { useFilterColors } from '../../../../hooks/use-color'
import useApp from '../../../../hooks/use-app'
import Button from '../../../components/ui/button/button'
import Filter from '../../../components/ui/filter/admin/filter'
import TableData from '../../../components/ui/table/table-data'

export default function Colors() {
  const navigate = useNavigate()
  const { docs, total, pages } = useFilterColors()
  const { setRefetch } = useApp()
  setRefetch(false)

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
        columns={colorColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
