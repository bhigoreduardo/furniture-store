import { ArrowsClockwise } from 'phosphor-react'

import {
  perPage as perPageType,
  priority as priorityType,
} from '../../../../../types/filter-type'
import { sanitizeSelectData } from '../../../../../utils/format'
import useFilter from '../../../../../hooks/use-filter'
import Button from '../../button/button'
import Input from '../../input/input'
import Select from '../../input/select'

export default function Filter() {
  const {
    search,
    setSearch,
    priority,
    setPriority,
    perPage,
    setPerPage,
    handleClear,
  } = useFilter()
  const order = sanitizeSelectData(priorityType, [
    'sold',
    'popularity',
    'minor-price',
    'biggest-price',
  ])

  return (
    <div className="flex justify-between gap-2">
      <div className="flex flex-grow items-center gap-2">
        <Input
          id="search"
          placeholder="Pesquisar..."
          name="search"
          title="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-[500px]"
        />
        {/* <Button
          icon={<MagnifyingGlass size={18} className="text-white" />}
          title="Procurar"
          className="bg-orange-500 text-white hover:bg-orange-600 !p-2"
        /> */}
        <Button
          icon={
            <ArrowsClockwise size={18} className="transition-all duration-0" />
          }
          title="Limpar"
          onClick={handleClear}
          className="text-orange-500 border !border-orange-500 !p-2 hover:bg-orange-500 hover:text-white transition-all duration-0"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select
          id="order"
          name="order"
          placeholder="Ordem"
          data={order}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <Select
          id="show"
          name="show"
          placeholder="Exibir"
          data={perPageType}
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
        />
      </div>
    </div>
  )
}
