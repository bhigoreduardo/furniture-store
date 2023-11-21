/* eslint-disable no-unsafe-optional-chaining */
import { prices } from '../../../../../types/filter-type'
import { useBrands } from '../../../../../hooks/use-brand'
import { useCategories } from '../../../../../hooks/use-category'
import useFilter from '../../../../../hooks/use-filter'
import CheckboxLabel from '../../input/checkbox-label'
import Input from '../../input/input'
import RadioBoxLabel from '../../input/radiobox-label'
import RangePrice from '../../input/range-price'

export default function FilterSidebar() {
  const { category, setCategory, brand, setBrand, priceRange, setPriceRange } =
    useFilter()
  const categories = useCategories()
  const brands = useBrands()

  return (
    <aside className="flex flex-col gap-6 w-[300px]">
      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <span className="font-semibold text-base text-gray-900 uppercase">
          Categoria
        </span>
        <div className="flex flex-col gap-3">
          {categories?.map((item) => (
            <RadioBoxLabel
              key={item._id}
              name="category"
              value={item._id}
              label={item.name}
              onChange={(e) => setCategory(e.target.value)}
              checked={category === item._id}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <span className="font-semibold text-base text-gray-900 uppercase">
          Preço
        </span>
        <RangePrice min={0} max={1000} />
        <div className="flex items-center justify-between gap-3">
          <Input
            id="min"
            placeholder="Minimo"
            name="min"
            title="Preço mínimo"
            value={priceRange?.split('-')[0]}
            onChange={(e) =>
              setPriceRange(
                `${e.target.value}-${priceRange?.split('-')[1] ?? ''}`
              )
            }
          />
          <Input
            id="max"
            placeholder="Máximo"
            name="max"
            title="Preço máximo"
            value={priceRange?.split('-')[1]}
            onChange={(e) =>
              setPriceRange(
                `${priceRange?.split('-')[0] ?? ''}-${e.target.value}`
              )
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          {prices?.map((item, i) => (
            <RadioBoxLabel
              key={i}
              name="price"
              value={item.value}
              label={item.label}
              onChange={(e) => setPriceRange(e.target.value)}
              checked={priceRange === item.value}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-6 border-b border-gray-200">
        <span className="font-semibold text-base text-gray-900 uppercase">
          Marca
        </span>
        <div className="flex flex-col gap-3">
          {brands?.map((item) => (
            <CheckboxLabel
              key={item._id}
              name="brand"
              label={item.name}
              onChange={({ target: { value } }) =>
                setBrand((prevState) =>
                  prevState?.length > 0 && prevState !== undefined
                    ? prevState?.includes(value)
                      ? [...prevState?.filter((val) => val !== value)]
                      : [...prevState?.push(value)]
                    : [value]
                )
              }
              value={item._id}
              checked={brand.includes(item._id)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
