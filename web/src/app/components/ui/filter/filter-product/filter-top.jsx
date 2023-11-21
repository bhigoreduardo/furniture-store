import {
  priority as priorityType,
  perPage as perPageType,
} from '../../../../../types/filter-type'
import { useCategories } from '../../../../../hooks/use-category'
import { useBrands } from '../../../../../hooks/use-brand'
import { parsedSelectData } from '../../../../../utils/format'
import useFilter from '../../../../../hooks/use-filter'
import SelectLabel from '../../input/select-label'
import Tag from '../../button/tag'

export default function FilterTop() {
  const {
    category,
    setCategory,
    brand,
    setBrand,
    priority,
    setPriority,
    perPage,
    setPerPage,
    handleClear,
  } = useFilter()
  const categories = useCategories()
  const brands = useBrands()
  const parsedCategories = parsedSelectData(
    categories?.filter((item) => item._id === category) ?? [],
    '_id',
    'name'
  )
  const parsedBrands = parsedSelectData(
    brands?.filter((item) => brand.includes(item._id)) ?? [],
    '_id',
    'name'
  )

  return (
    <nav className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SelectLabel
          id="show"
          label="Exibir"
          name="show"
          placeholder="Selecione"
          data={perPageType}
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
          className="!flex-row"
        />
        <SelectLabel
          id="priority"
          label="Ordernar por"
          name="priority"
          placeholder="Selecione"
          data={priorityType}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="!flex-row"
        />
      </div>
      <div className="flex items-center gap-4 bg-gray-100 px-6 py-3">
        <span className="text-sm">Filtros:</span>
        {parsedCategories?.map((item) => (
          <Tag
            key={item.value}
            content={item.label}
            handleRemove={() => setCategory('')}
          />
        ))}
        {parsedBrands?.map((item) => (
          <Tag
            key={item.value}
            content={item.label}
            handleRemove={() =>
              setBrand((prevState) =>
                prevState.filter((value) => value !== item.value)
              )
            }
          />
        ))}
        <Tag content="Limpar" handleRemove={handleClear} className="ml-auto" />
      </div>
    </nav>
  )
}
