import { useState } from 'react'
import { ArrowsClockwise } from 'phosphor-react'

import {
  perPage as perPageType,
  priority as priorityType,
  featured as featuredType,
  actived as activedType,
} from '../../../../../types/filter-type'
import useFilter from '../../../../../hooks/use-filter'
import Button from '../../button/button'
import Input from '../../input/input'
import Select from '../../input/select'

export default function FilterProduct() {
  const {
    search,
    setSearch,
    priority,
    setPriority,
    perPage,
    setPerPage,
    featured,
    setFeatured,
    actived,
    setActived,
    category,
    setCategory,
    brand,
    setBrand,
    handleClear,
  } = useFilter()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

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
          id="order"
          name="order"
          placeholder="Ordem"
          data={priorityType}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <Select
          id="category"
          name="category"
          placeholder="Categoria"
          data={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Select
          id="brand"
          name="brand"
          placeholder="Marca"
          data={brands}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Select
          id="featured"
          name="featured"
          placeholder="Estoque"
          data={featuredType}
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
        />
        <Select
          id="actived"
          name="actived"
          placeholder="Ativo"
          data={activedType}
          value={actived}
          onChange={(e) => setActived(e.target.value)}
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
