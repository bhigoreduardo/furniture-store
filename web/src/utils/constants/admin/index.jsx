import { ArrowRight } from 'phosphor-react'
import { Link } from 'react-router-dom'

export const categoryColumns = [
  {
    accessorKey: 'name',
    header: 'Nome',
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
        <span className={`w-6 h-6 rounded-full bg-[${row.original?.color}]`} />
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
