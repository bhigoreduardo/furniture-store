import { XCircle } from 'phosphor-react'
import { currencyPrice } from '../../format'
import Count from '../../../app/components/ui/button/count'

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
