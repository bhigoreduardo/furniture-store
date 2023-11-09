import { ArrowRight, PencilLine, Trash } from 'phosphor-react'
import { Link } from 'react-router-dom'

import { currencyPrice, optionsShortLocaleDate } from '../../format'

const serverPublicImages = import.meta.env.VITE_SERVER_PUBLIC_IMAGES

export const categoryColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={`${serverPublicImages}/${row?.original?.image}`}
          alt={row?.original?.name}
          className="h-12 w-12 rounded-full bg-gray-500 object-contain"
        />
        <span>{row?.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'slug',
    header: 'Link',
    cell: ({ row }) => (
      <Link to={`/${row.original?.slug}`}>{row.original?.slug}</Link>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Produtos',
    cell: ({ row }) => row?.original?.products ?? '-',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`editar/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const colorColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span
          className={`w-6 h-6 rounded-full border border-gray-300 bg-[${row.original?.color.slice(
            1
          )}]`}
        />
        <span className="font-semibold text-gray-900 text-sm capitalize">
          {row.original?.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'slug',
    header: 'Link',
    cell: ({ row }) => (
      <Link to={`/${row.original?.slug}`}>{row.original?.slug}</Link>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Produtos',
    cell: ({ row }) => row?.original?.products ?? '-',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`editar/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const brandColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={`${serverPublicImages}/${row?.original?.image}`}
          alt={row?.original?.name}
          className="h-12 w-12 rounded-full bg-gray-500 object-contain"
        />
        <span>{row?.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'slug',
    header: 'Link',
    cell: ({ row }) => (
      <Link to={`/${row.original?.slug}`}>{row.original?.slug}</Link>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Produtos',
    cell: ({ row }) => row?.original?.products ?? '-',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`editar/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const productColumns = [
  {
    accessorKey: 'product',
    header: 'Produto',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
  },
  {
    accessorKey: 'sales',
    header: 'Vendas',
  },
  {
    accessorKey: 'reviews',
    header: 'Avaliações',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`editar/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const infoProductColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-blue-600">
        <button
          type="button"
          title="Editar"
          onClick={() => handleEdit(row?.index)}
        >
          <PencilLine size={16} />
        </button>
        <button
          type="button"
          title="Excluir"
          onClick={() => handleDelete(row?.index)}
          className="text-red-500"
        >
          <Trash size={16} />
        </button>
      </div>
    ),
  },
]

export const invetoryProductColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'color',
    header: 'Cor',
  },
  {
    accessorKey: 'stock',
    header: 'Quantidade',
  },
  {
    accessorKey: 'price',
    header: 'Preço',
    cell: ({ row }) => currencyPrice.format(row?.original?.price),
  },
  {
    accessorKey: 'offer',
    header: 'Desconto',
    cell: ({ row }) =>
      row?.original?.offer?.offerValue ? (
        <div className="flex flex-col text-xs">
          <p>
            <span className="font-semibold">Desconto: </span>
            {row?.original?.offer?.offerType === 'percentage'
              ? `${row?.original?.offer?.offerValue}%`
              : currencyPrice.format(row?.original?.offer?.offerValue)}
          </p>
          <p>
            <span className="font-semibold">Preço: </span>
            {currencyPrice.format(row?.original?.offer?.offerPrice)}
          </p>
          {row?.original?.offer?.offerPriceDates[0] && (
            <p>
              <span className="font-semibold">Data criação: </span>
              {new Date(
                row?.original?.offer?.offerPriceDates[0]
              ).toLocaleDateString('pt-BR', optionsShortLocaleDate)}
            </p>
          )}
          {row?.original?.offer?.offerPriceDates[1] && (
            <p>
              <span className="font-semibold">Data expiração: </span>
              {new Date(
                row?.original?.offer?.offerPriceDates[1]
              ).toLocaleDateString('pt-BR', optionsShortLocaleDate)}
            </p>
          )}
        </div>
      ) : (
        '-'
      ),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-blue-600">
        <button
          type="button"
          title="Editar"
          onClick={() => handleEdit(row?.index)}
        >
          <PencilLine size={16} />
        </button>
        <button
          type="button"
          title="Excluir"
          onClick={() => handleDelete(row?.index)}
          className="text-red-500"
        >
          <Trash size={16} />
        </button>
      </div>
    ),
  },
]

export const customerColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          className="h-6 w-6 rounded-full"
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <span className="font-semibold text-sm text-gray-900 capitalize">
          {row?.original?.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'whatsApp',
    header: 'Contato',
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) => {
      return row?.original?.address ? (
        <div className="flex flex-col text-xs">
          <span>
            {row?.original?.address?.street},{' '}
            {row?.original?.address?.neighborhood} -{' '}
            {row?.original?.address?.number}
          </span>
          <span>
            {row?.original?.address?.city}/{row?.original?.address?.state},{' '}
            {row?.original?.address?.zipCode}
          </span>
          <span>{row?.original?.address?.complement}</span>
        </div>
      ) : (
        <span>-</span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`perfil/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]

export const userColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          className="h-6 w-6 rounded-full"
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <span className="font-semibold text-sm text-gray-900 capitalize">
          {row?.original?.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'whatsApp',
    header: 'Contato',
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) => {
      return row?.original?.address ? (
        <div className="flex flex-col text-xs">
          <span>
            {row?.original?.address?.street},{' '}
            {row?.original?.address?.neighborhood} -{' '}
            {row?.original?.address?.number}
          </span>
          <span>
            {row?.original?.address?.city}/{row?.original?.address?.state},{' '}
            {row?.original?.address?.zipCode}
          </span>
          <span>{row?.original?.address?.complement}</span>
        </div>
      ) : (
        <span>-</span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <Link
        to={`editar/${row.original?._id}`}
        className="flex items-center gap-1 text-sm text-blue-500"
      >
        Vê detalhes <ArrowRight size={14} />
      </Link>
    ),
  },
]
