import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'phosphor-react'

import { currencyPrice } from '../../../../utils/format'
import { cartColumns } from '../../../../utils/constants/admin/public'
import Button from '../../../components/ui/button/button'
import Container from '../../../components/ui/container'
import TableData from '../../../components/ui/table/table-data'
import InputLabel from '../../../components/ui/input/input-label'
import useApp from '../../../../hooks/use-app'

export default function CartItems() {
  const navigate = useNavigate()
  const { cartItems, handleCartItems } = useApp()
  const handleDelete = (product, color) => {
    handleCartItems(
      cartItems.filter(
        (item) => `${item.product}.${item.color}` !== `${product}.${color}`
      )
    )
  }
  const handleDecrease = (product, color) => {
    const findIndex = cartItems.findIndex(
      (item) => item.product === product && item.color === color
    )

    if (cartItems[findIndex].quantity === 1) return
    cartItems[findIndex].quantity -= 1
    handleCartItems([...cartItems])
  }
  const handleIncrease = (product, color) => {
    const findIndex = cartItems.findIndex(
      (item) => item.product === product && item.color === color
    )

    if (cartItems[findIndex].stock === cartItems[findIndex].quantity) return
    cartItems[findIndex].quantity += 1
    handleCartItems([...cartItems])
  }
  const handleClear = () => handleCartItems([])
  const subAmount = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  )

  return (
    <Container className="flex items-start gap-6 py-[100px]">
      <div className="flex-grow flex flex-col border border-gray-200 rounded-sm py-3">
        <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
          Carrinho <span className="font-normal">({cartItems?.length})</span>
        </h4>
        <TableData
          columns={cartColumns(handleDelete, handleDecrease, handleIncrease)}
          data={cartItems}
          className="border-none shadow-none !p-0 rounded-none"
        />
        <div className="flex items-center justify-between pt-3 px-6 border-t border-gray-200">
          <Button
            label="Comprar mais"
            onClick={() => navigate('/')}
            icon={<ArrowLeft size={20} />}
            className="flex-row-reverse text-blue-500 !border-blue-200 hover:bg-blue-600 hover:text-white"
          />
          <Button
            label="Limpar carrinho"
            onClick={handleClear}
            className="text-blue-500 !border-blue-200 hover:bg-blue-600 hover:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex flex-col border border-gray-200 rounded-sm py-3 gap-4">
          <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
            Total
          </h4>
          <div className="flex flex-col gap-2 px-6">
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Sub-Total:</span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount)}
              </span>
            </p>
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Entrega:</span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount)}
              </span>
            </p>
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Desconto:</span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount)}
              </span>
            </p>
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Taxa:</span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount)}
              </span>
            </p>
          </div>
          <p className="flex items-center justify-between text-sm text-gray-900 border-t border-gray-200 px-6 pt-3">
            <span className="font-normal">Total:</span>
            <span className="font-semibold">
              {currencyPrice.format(subAmount)}
            </span>
          </p>
          <Button
            label="Finalizar compra"
            icon={<ArrowRight size={20} className="text-white" />}
            // onClick={() => navigate('/finalizar-compra')}
            className="bg-orange-500 text-white hover:bg-orange-600 mx-6"
          />
        </div>

        <div className="flex flex-col border border-gray-200 rounded-sm py-3 gap-4">
          <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
            Cupom de desconto
          </h4>
          <form
            // onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 px-6"
          >
            <InputLabel
              id="coupon"
              placeholder="Infome cupom de desconto"
              name="coupon"
              // error={formik.touched.name && formik.errors.name}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.name}
              className="flex-grow"
            />
            <Button
              type="submit"
              label="Aplicar"
              className="bg-blue-500 text-white hover:bg-blue-600 w-fit !p-2"
            />
          </form>
        </div>
      </div>
    </Container>
  )
}
