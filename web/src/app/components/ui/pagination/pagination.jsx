import useFilter from '../../../../hooks/use-filter'
import Arrow from '../button/arrow'
import Bullet from './bullet'

export default function Pagination() {
  const { page, setPage, totalPage } = useFilter()
  const handlePage = (item) => setPage(item)
  const handleArrowPage = (direction) => {
    if (direction === 'right') {
      if (page === totalPage) return
      return setPage((prevState) => prevState + 1)
    }
    if (page === 1) return
    setPage((prevState) => prevState - 1)
  }

  return (
    totalPage > 1 && (
      <div className="flex items-center justify-center gap-5 mx-auto">
        <Arrow onClick={() => handleArrowPage('left')} />
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPage }, (_, k) => k + 1).map((item) => (
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
    )
  )
}
