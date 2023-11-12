import { ArrowRight } from 'phosphor-react'

import { useCategories } from '../../../../../hooks/use-category'
import Button from '../../../ui/button/button'
import FooterLink from './footer-link'

export default function CategoryNav() {
  const categories = useCategories()

  return (
    <div className="flex flex-col gap-3 w-[200px]">
      <h4 className="font-semibold text-white text-base uppercase">
        Categorias
      </h4>
      <div className="flex flex-col gap-2">
        {categories?.map((item) => (
          <FooterLink key={item._id} label={item.name} to={item.slug} />
        ))}
        <Button
          label="Todos"
          icon={<ArrowRight size={16} className="text-yellow-500" />}
          className="normal-case !justify-start !gap-1 text-yellow-500 text-sm !p-0"
        />
      </div>
    </div>
  )
}
