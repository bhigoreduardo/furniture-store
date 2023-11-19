import { wishlistColumns } from '../../../utils/constants/public'
import { ProtectedRoute } from '../../layouts/public/dashboard'
import { useFilterFavorits } from '../../../hooks/use-product'
import Container from '../../components/ui/container'
import TableData from '../../components/ui/table/table-data'

export default function Wishlist() {
  const { docs } = useFilterFavorits()

  return (
    <ProtectedRoute>
      <Container className="flex items-center justify-center py-[100px]">
        <TableData
          title="Favoritos"
          columns={wishlistColumns}
          data={docs}
          // total={total}
          // pages={pages}
          className="w-full"
        />
      </Container>
    </ProtectedRoute>
  )
}
