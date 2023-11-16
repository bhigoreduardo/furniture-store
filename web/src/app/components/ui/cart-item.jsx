/* eslint-disable react/prop-types */
import { X } from 'phosphor-react'

import { currencyPrice } from '../../../utils/format'
import useApp from '../../../hooks/use-app'

export default function CartItem({
  product,
  color,
  cover,
  name,
  quantity,
  price,
  bg,
  colorName,
  isCheckout = false,
}) {
  const { cartItems, handleCartItems } = useApp()
  const handleRemove = () => {
    handleCartItems(
      cartItems.filter(
        (item) => `${item.product}.${item.color}` !== `${product}.${color}`
      )
    )
  }

  return (
    <article className="flex items-center gap-4">
      <img
        src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${cover}`}
        alt={name}
        className="w-20 h-20 object-cover"
      />
      <div className="flex-grow flex flex-col justify-between">
        <h6 className="font-normal text-sm line-clamp-2 text-gray-900">
          {name}
        </h6>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400">Cor:</span>
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: bg }}
            title={colorName}
          />
        </div>
        <p className="flex items-center gap-1 text-sm">
          <span className="text-gray-600">{quantity}x</span>
          <span className="font-semibold text-blue-500">
            {currencyPrice.format(price)}
          </span>
        </p>
      </div>
      {!isCheckout && (
        <button type="button" onClick={handleRemove}>
          <X size={20} className="text-gray-600" />
        </button>
      )}
    </article>
  )
}
