import { ProtectedRoute } from '../../../layouts/public/dashboard'
import useApp from '../../../../hooks/use-app'
import Container from '../../../components/ui/container'
import FormCheckout from '../../../components/ui/form/public/form-checkout'
import EmptyCart from '../cart/empty-cart'

export default function Checkout() {
  const { cartItems } = useApp()

  return cartItems?.length > 0 ? (
    <ProtectedRoute>
      <Container className="py-[100px]">
        <FormCheckout />
      </Container>
    </ProtectedRoute>
  ) : (
    <EmptyCart />
  )
}
