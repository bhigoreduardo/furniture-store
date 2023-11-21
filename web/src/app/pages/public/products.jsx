// import { createEmptyArr } from '../../../utils/format'
import { useFilterProducts } from '../../../hooks/use-product'
import FilterProduct from '../../components/ui/filter/filter-product'
import CardProduct from '../../components/ui/card/card-product'
import Breadcrumb from '../../components/ui/breadcrumb'
import Pagination from '../../components/ui/pagination/pagination'

export default function Products() {
  const { docs, total, pages } = useFilterProducts()

  return (
    <section className="flex flex-col gap-10">
      <Breadcrumb />
      <FilterProduct>
        <section className="flex flex-col gap-6">
          <div className="grid grid-cols-auto-250 gap-4">
            {docs?.map((item) => (
              <CardProduct
                key={item._id}
                id={item._id}
                name={item.name}
                cover={item?.productData?.media?.cover}
                backCover={item?.productData?.media?.backCover}
                rangePrice={item.rangePrice}
              />
            ))}
            {/* {createEmptyArr(6).map((_, i) => (
              <CardProduct
                key={i}
                badge="Oferta"
                badgeColor="green"
                reviews={{ avg: 3.7, amount: 56767 }}
                name="DELL 21.5 inch Full HD Monitor (E2216HV)"
                rangePrice={{ min: 442.12, max: 865.99 }}
              />
            ))} */}
          </div>
          {typeof total !== 'undefined' && typeof pages !== 'undefined' && (
            <Pagination total={total} pages={pages} className="mt-6" />
          )}
        </section>
      </FilterProduct>
    </section>
  )
}
