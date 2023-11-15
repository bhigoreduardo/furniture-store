/* eslint-disable react/prop-types */
import { ArrowRight } from 'phosphor-react'

import { currencyPrice, mergeClassName } from '../../../../../utils/format'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import CartItem from '../../cart-item'

export default function CardCart({ setIsCardCart, className }) {
  const { cartItems } = useApp()
  const subAmount = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  )

  return (
    <article
      className={mergeClassName(
        'w-full max-w-[400px] border border-gray-100 bg-white rounded-sm shadow-md py-6 px-6',
        className
      )}
    >
      <div className="flex flex-col gap-6">
        <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 pb-3">
          Carrinho <span className="font-normal">({cartItems?.length})</span>
        </h4>
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
          {cartItems.map((item, i) => (
            <CartItem key={i} {...item} />
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-3">
          <p className="flex items-center justify-between text-sm text-gray-900">
            <span className="font-normal">Sub-Total:</span>
            <span className="font-semibold">
              {currencyPrice.format(subAmount)}
            </span>
          </p>
          <Button
            label="Finalizar compra"
            icon={<ArrowRight size={20} className="text-white" />}
            onClick={() => {
              setIsCardCart(false)
              // navigate('/finalizar-compra')
            }}
            className="bg-orange-500 text-white hover:bg-orange-600"
          />
          <Button
            label="Carrinho"
            onClick={() => {
              setIsCardCart(false)
              // navigate('/carrinho')
            }}
            className="text-orange-500 !border-orange-200 hover:bg-orange-600 hover:text-white"
          />
        </div>
      </div>
    </article>
  )
}
