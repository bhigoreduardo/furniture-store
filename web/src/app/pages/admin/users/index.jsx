import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { userColumns } from '../../../../utils/constants/admin'
import { useFilterUsers } from '../../../../hooks/admin/use-user'
import Button from '../../../components/ui/button/button'
import FilterUser from '../../../components/ui/filter/admin/filter-user'
import TableData from '../../../components/ui/table/table-data'

export default function Users() {
  const navigate = useNavigate()
  const { docs, total, pages } = useFilterUsers()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterUser />
      <TableData
        title="Usuários"
        btn={
          <Button
            label="Adicionar"
            icon={<PlusCircle size={16} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
            onClick={() => navigate('cadastrar')}
          />
        }
        columns={userColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
