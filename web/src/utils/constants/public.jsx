import { Link } from 'react-router-dom'
import { ArrowRight, XCircle, ShoppingCartSimple } from 'phosphor-react'

import {
  currencyPrice,
  getOrderStatusColor,
  optionsShortLocaleDate,
  translateOrderStatus,
} from '../format'
import Count from '../../app/components/ui/button/count'
import Button from '../../app/components/ui/button/button'
import { Fragment } from 'react'

const serverPublicImages = import.meta.env.VITE_SERVER_PUBLIC_IMAGES

export const cartColumns = (handleDelete, handleDecrease, handleIncrease) => [
  {
    accessorKey: 'product',
    header: 'Produto',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            handleDelete(row?.original?.product, row?.original?.color)
          }
          className="text-gray-400 hover:text-red-500"
        >
          <XCircle size={20} weight="duotone" />
        </button>
        <img
          src={`${serverPublicImages}/${row?.original?.cover}`}
          alt={row?.original?.name}
          className="w-16 h-16 object-cover"
        />
        <div className="flex flex-col gap-1">
          <h6 className="font-normal text-sm text-gray-900">
            {row?.original?.name}
          </h6>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-400">Cor:</span>
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: row?.original?.bg }}
              title={row?.original?.colorName}
            />
          </div>
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Estoque:</span>{' '}
            {row?.original?.stock}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row?.original?.price !== row?.original?.regularPrice && (
          <span className="text-gray-400 line-through">
            {currencyPrice.format(row?.original?.regularPrice)}
          </span>
        )}
        <span className="text-blue-500">
          {currencyPrice.format(row?.original?.price)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
    cell: ({ row }) => (
      <Count
        handleDecrease={() =>
          handleDecrease(row?.original?.product, row?.original?.color)
        }
        handleIncrease={() =>
          handleIncrease(row?.original?.product, row?.original?.color)
        }
        value={row?.original?.quantity}
        className="w-[140px]"
      />
    ),
  },
  {
    accessorKey: 'subAmount',
    header: 'Sub-Total',
    cell: ({ row }) =>
      currencyPrice.format(row?.original?.price * row?.original?.quantity),
  },
]

export const orderColumns = [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => (
      <span className="font-semibold text-sm text-gray-900">
        {row?.original?.code}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const history = row?.original?.status[0]?.history

      return (
        <span
          className={`font-semibold uppercase ${getOrderStatusColor(history)}`}
        >
          {translateOrderStatus(history)}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
    cell: ({ row }) =>
      new Date(row?.original?.createdAt).toLocaleDateString(
        'pt-BR',
        optionsShortLocaleDate
      ),
  },
  {
    accessorKey: 'amount',
    header: 'Total',
    cell: ({ row }) => (
      <span>
        {currencyPrice.format(row?.original?.payment?.amount)} (
        {row?.original?.payment?.cartQuantity})
      </span>
    ),
  },
  {
    accessorKey: 'payment',
    header: 'Forma de pagamento',
    cell: ({ row }) => row?.original?.payment?.method?.method,
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`/conta/pedidos/detalhe/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const cartOrderColumns = [
  {
    accessorKey: 'product',
    header: 'Produto',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={`${serverPublicImages}/${row?.original?.cover}`}
          alt={row?.original?.name}
          className="w-16 h-16 object-cover"
        />
        <div className="flex flex-col gap-1">
          <h6 className="font-normal text-sm text-blue-500">
            {row?.original?.name}
          </h6>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-400">Cor:</span>
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: row?.original?.bg }}
              title={row?.original?.colorName}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          {row?.original?.price !== row?.original?.regularPrice && (
            <span className="text-gray-400 line-through">
              {currencyPrice.format(row?.original?.regularPrice)}
            </span>
          )}
          <span className="text-blue-500">
            {currencyPrice.format(row?.original?.price)}
          </span>
        </div>
        {row?.original?.fee && (
          <span className="text-xs text-gray-600">
            Frete: {currencyPrice.format(row?.original?.fee)}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
  },
  {
    accessorKey: 'subAmount',
    header: 'Sub-Total',
    cell: ({ row }) => currencyPrice.format(row?.original?.subAmount),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Button
        label="Avaliar"
        // className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse uppercase"
        className="!gap-1 font-semibold text-sm text-orange-500 hover:bg-orange-500 hover:text-white !py-2"
        // onClick={() => navigate(-1)}
      />
    ),
  },
]

export const wishlistColumns = [
  {
    accessorKey: 'product',
    header: 'Produto',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={`${serverPublicImages}/${row?.original?.productData?.media?.cover}`}
          alt={row?.original?.name}
          className="w-16 h-16 object-cover"
        />
        <p className="flex flex-col">
          <span className="font-normal text-sm text-blue-500">
            {row?.original?.name}
          </span>
          <span className="text-xs">
            Categoria:{' '}
            {row?.original?.category?.map((item, i) => (
              <Fragment key={item._id}>
                {item.name}
                {row?.original?.category?.length === i + 1 ? '' : '/'}
              </Fragment>
            ))}
          </span>
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-gray-400 line-through">
            {currencyPrice.format(row?.original?.rangePrice?.max)}
          </span>
          <span className="text-blue-500">
            {currencyPrice.format(row?.original?.rangePrice?.min)}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Disponibilidade',
    cell: ({ row }) => (
      <span
        className={`font-semibold uppercase text-sm ${
          row?.original?.status ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {row?.original?.status ? 'Em estoque' : 'Fora de estoque'}
      </span>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link
          to={`/produto/${row.original?._id}`}
          className="flex items-center gap-1 font-semibold text-sm text-white bg-orange-500 hover:bg-orange-600 duration-300 ease-in-out py-2 px-3 uppercase"
        >
          Comprar <ShoppingCartSimple size={14} />
        </Link>
        <Button
          icon={<XCircle size={20} weight="duotone" />}
          className="text-gray-400 hover:text-red-500 !p-0 flex-row-reverse"
          // onClick={() => navigate(-1)}
        />
      </div>
    ),
  },
]
