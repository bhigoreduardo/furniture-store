import useApp from '../../../../hooks/use-app'
import CartItems from './cart-items'
import EmptyCart from './empty-cart'

export default function Cart() {
  const { cartItems } = useApp()

  return cartItems?.length > 0 ? (
    <CartItems />
  ) : (
    <EmptyCart
      title="Carrinho vazio"
      description="Navegue em nossa loja e escolha os produtos."
    />
  )
}
