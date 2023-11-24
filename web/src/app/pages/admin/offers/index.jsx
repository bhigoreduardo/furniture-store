import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { offerColumns } from '../../../../utils/constants/admin'
import { useFilterOffers } from '../../../../hooks/admin/use-offer'
import Button from '../../../components/ui/button/button'
import FilterOffer from '../../../components/ui/filter/admin/filter-offer'
import TableData from '../../../components/ui/table/table-data'

export default function Offers() {
  const navigate = useNavigate()
  const { docs, total, pages } = useFilterOffers()

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterOffer />
      <TableData
        title="Ofertas e cupons"
        btn={
          <Button
            label="Adicionar"
            icon={<PlusCircle size={16} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 !py-2"
            onClick={() => navigate('cadastrar')}
          />
        }
        columns={offerColumns}
        data={docs}
        total={total}
        pages={pages}
      />
    </section>
  )
}
