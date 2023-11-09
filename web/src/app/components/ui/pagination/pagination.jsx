/* eslint-disable react/prop-types */
import useFilter from '../../../../hooks/use-filter'
import Arrow from '../button/arrow'
import Bullet from './bullet'

export default function Pagination({ total, pages }) {
  const { page, setPage } = useFilter()
  const handlePage = (item) => setPage(item)
  const handleArrowPage = (direction) => {
    if (direction === 'right') {
      if (page === pages) return
      return setPage((prevState) => prevState + 1)
    }
    if (page === 1) return
    setPage((prevState) => prevState - 1)
  }

  return (
    <div className="flex items-center justify-between px-6">
      <p className="text-xs text-gray-600">
        <span className="font-semibold">({total})</span> Resultados
      </p>
      {pages > 1 && (
        <div className="flex items-center gap-5 w-fit">
          <Arrow onClick={() => handleArrowPage('left')} />
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }, (_, k) => k + 1).map((item) => (
              <Bullet
                key={item}
                label={item}
                selected={item === page}
                onClick={() => handlePage(item)}
              />
            ))}
          </div>
          <Arrow direction="right" onClick={() => handleArrowPage('right')} />
        </div>
      )}
    </div>
  )
}
