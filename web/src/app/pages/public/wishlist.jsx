import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { patch } from '../../../libs/fetcher'
import { UserEnum } from '../../../types/user-type'
import { wishlistColumns } from '../../../utils/constants/public'
import { ProtectedRoute } from '../../layouts/public/dashboard'
import { useFilterFavorits } from '../../../hooks/use-product'
import useApp from '../../../hooks/use-app'
import useUser from '../../../hooks/use-user'
import Container from '../../components/ui/container'
import TableData from '../../components/ui/table/table-data'
import EmptyCart from './cart/empty-cart'

export default function Wishlist() {
  const navigate = useNavigate()
  const { user, token, handleUpdateUser } = useUser()
  const { docs } = useFilterFavorits()
  const { setIsLoading } = useApp()
  const handleProduct = async (id) => {
    if (!user || !token || user?._type !== UserEnum.Customer)
      return navigate('/entrar')
    const { user: userData, token: tokenData } = await patch(
      '/customers/toggle-favorite',
      { id: id },
      setIsLoading,
      toast
    )
    handleUpdateUser(userData, tokenData)
  }

  return (
    <ProtectedRoute>
      {docs ? (
        <Container className="flex items-center justify-center py-[100px]">
          <TableData
            title="Favoritos"
            columns={wishlistColumns(handleProduct)}
            data={docs}
            className="w-full"
          />
        </Container>
      ) : (
        <EmptyCart
          title="Favoritos vazio"
          description="Navegue em nossa loja e escolha os produtos."
        />
      )}
    </ProtectedRoute>
  )
}
