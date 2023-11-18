/* eslint-disable react/prop-types */
import { cartOrderColumns } from '../../../../utils/constants/public'
import {
  currencyPrice,
  optionsFullLocaleDate,
  getOrderHistoryStyle,
  optionsShortLocaleDate,
} from '../../../../utils/format'
import { mobileMask, zipCodeMask } from '../../../../utils/mask'
import OrderProcess from '../order-process'
import TableData from '../table/table-data'

export default function FormOrder({ data }) {
  const createdAt = new Date(data?.createdAt)
  const timeDelivery = data?.cart?.reduce(
    (acc, cur) => acc + cur.timeDelivery,
    0
  )
  const customOptionsDate = {
    ...optionsFullLocaleDate(true),
    hour: 'numeric',
    minute: 'numeric',
  }
  const orderHistory = data?.status?.map((item) => getOrderHistoryStyle(item))

  return (
    <form className="flex flex-col gap-6 px-6">
      <div className="flex flex-col gap-6 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between p-6 bg-yellow-50">
          <div className="flex flex-col gap-2">
            <h6 className="text-xl text-gray-900">#{data.code}</h6>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <span>{data?.payment?.cartQuantity} produtos</span>
              <span>.</span>
              <span>
                Data: {createdAt.toLocaleDateString('pt-BR', customOptionsDate)}
              </span>
            </p>
          </div>
          <h5 className="font-semibold text-3xl text-blue-500">
            {currencyPrice.format(data?.payment?.amount)}
          </h5>
        </div>
        <p className="text-sm text-gray-600">
          Entrega estimada para:{' '}
          <span className="font-semibold text-gray-900">
            {new Date(
              createdAt.setDate(createdAt.getDate() + timeDelivery)
            ).toLocaleDateString('pt-BR', optionsFullLocaleDate(false))}
          </span>
        </p>
        <OrderProcess />
      </div>

      <div className="flex flex-col gap-6 border-b border-gray-100 pb-6">
        <h5 className="font-semibold text-lg text-gray-900">Histórico</h5>
        <div className="flex flex-col gap-4">
          {orderHistory?.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`${item.bgIcon} p-2`}>{item.icon}</div>
              <p className="flex flex-col justify-between font-semibold text-sm text-gray-900">
                {item.text}
                <span className="font-normal text-xs text-gray-600">
                  {new Date(item.dateTime).toLocaleDateString(
                    'pt-BR',
                    optionsShortLocaleDate
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-gray-100">
        <h5 className="font-semibold text-lg text-gray-900">
          Produtos ({data?.payment?.cartQuantity})
        </h5>
        <TableData
          columns={cartOrderColumns}
          data={data?.cart}
          className="!p-0 !border-none !shadow-none"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex-1 flex flex-col gap-4 pr-4 border-r border-gray-100">
          <h5 className="font-semibold text-lg text-gray-900">
            Informação para entrega
          </h5>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-gray-900">
              {data?.customer?.name}
            </span>
            <div className="flex flex-col text-sm text-gray-600">
              <span>
                {data?.address?.street}, {data?.address?.neighborhood} -{' '}
                {data?.address?.number}
              </span>
              <span>
                {data?.address?.city}/{data?.address?.state},{' '}
                {zipCodeMask(data?.address?.zipCode)}
              </span>
              <span>{data?.address?.complement}</span>
            </div>
            <div className="flex flex-col text-sm text-gray-900">
              <p className="font-semibold">
                WhatsApp:{' '}
                <span className="font-normal text-gray-600">
                  {mobileMask(data?.customer?.whatsApp)}
                </span>
              </p>
              <p className="font-semibold">
                Email:{' '}
                <span className="font-normal text-gray-600">
                  {data?.customer?.email}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 pl-4">
          <h5 className="font-semibold text-lg text-gray-900">Observações</h5>
          <p className="text-sm text-gray-600">{data?.obs}</p>
        </div>
      </div>
    </form>
  )
}
