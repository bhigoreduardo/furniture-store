import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { patch } from '../../../libs/fetcher'
import { useCompare } from '../../../hooks/use-product'
import { compareColumns } from '../../../utils/constants/public'
import { ProtectedRoute } from '../../layouts/public/dashboard'
import useApp from '../../../hooks/use-app'
import useUser from '../../../hooks/use-user'
import Container from '../../components/ui/container'
import TableData from '../../components/ui/table/table-data'
import EmptyCart from './cart/empty-cart'

export default function Compare() {
  const navigate = useNavigate()
  const data = useCompare()
  const { setIsLoading } = useApp()
  const { user, token, handleUpdateUser } = useUser()
  const handleProduct = async (endpoint, id) => {
    if (!user || !token) return navigate('/entrar')
    const { user: userData, token: tokenData } = await patch(
      endpoint,
      { id: id },
      setIsLoading,
      toast
    )
    handleUpdateUser(userData, tokenData)
  }

  return (
    <ProtectedRoute>
      {data?.length > 0 ? (
        <Container className="flex items-center justify-center py-[100px]">
          <TableData
            columns={compareColumns(handleProduct, user?.favorits)}
            data={data}
            isColumn
            className="w-full !p-0"
          />
        </Container>
      ) : (
        <EmptyCart
          title="Compare vazio"
          description="Navegue em nossa loja e escolha os produtos."
        />
      )}
    </ProtectedRoute>
  )
}
