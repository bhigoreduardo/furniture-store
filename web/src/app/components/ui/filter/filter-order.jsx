import { ArrowsClockwise } from 'phosphor-react'

import { perPage as perPageType } from '../../../../types/filter-type'
import { orderStatus as statusType } from '../../../../types/product-type'
import Button from '../button/button'
import Input from '../input/input'
import useFilter from '../../../../hooks/use-filter'
import Select from '../input/select'
import DatePickerLabel from '../input/datepicker-label'

export default function FitlerOrder() {
  const {
    search,
    setSearch,
    perPage,
    orderStatus,
    setOrderStatus,
    setPerPage,
    startDate,
    endDate,
    setDateRange,
    handleClear,
  } = useFilter()

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
          id="status"
          name="status"
          placeholder="Status"
          data={statusType}
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        />
        <DatePickerLabel
          id="rangeDate"
          name="rangeDate"
          placeholder="Selecione a data"
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
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
