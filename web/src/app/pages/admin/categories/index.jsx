import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'phosphor-react'

import { get } from '../../../../libs/fetcher'
import { categoryColumns } from '../../../../utils/constants/admin'
import useFilter from '../../../../hooks/use-filter'
import TableData from '../../../components/ui/table/table-data'
import FilterCategory from '../../../components/ui/filter/admin/filter-category'
import Button from '../../../components/ui/button/button'

export default function Categories() {
  const navigate = useNavigate()
  const { search, priority, page, perPage, setTotalCount, setTotalPage } =
    useFilter()
  const [data, setData] = useState([])
  const getCategories = async () => {
    const { docs, pages, total } = await get(
      `/categories/search?search=${search}&priority=${priority}&page=${page}&perPage=${perPage}`
    )
    setTotalCount(total)
    setTotalPage(pages)
    setData(docs)
  }
  useEffect(() => {
    getCategories()
  }, [search, priority, page, perPage]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="flex-grow flex flex-col gap-6">
      <FilterCategory />
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
        data={data}
      />
    </section>
  )
}
