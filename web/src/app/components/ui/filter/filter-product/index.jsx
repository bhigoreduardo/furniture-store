/* eslint-disable react/prop-types */
import Container from '../../container'
import FilterSidebar from './filter-sidebar'
import FilterTop from './filter-top'

export default function FilterProduct({ children }) {
  return (
    <Container className="flex items-start gap-6 pb-[100px]">
      <FilterSidebar />
      <section className="flex-grow flex flex-col gap-6">
        <FilterTop />
        {children}
      </section>
    </Container>
  )
}
