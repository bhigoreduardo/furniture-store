/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import Pagination from '../pagination/pagination'
import Heading from '../heading'

export default function TableData({ title, btn, columns, data }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col border border-100 rounded-sm shadow-md py-2 pb-4">
      <Heading title={title} btn={btn} />
      <Table className="mb-6">
        <TableHeader>
          {table.getHeaderGroups()?.map((item, i) => (
            <TableRow key={i}>
              {item.headers?.map((value, key) => (
                <TableHead key={key}>
                  {value.isPlaceholder
                    ? null
                    : flexRender(
                        value.column.columnDef.header,
                        value.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((item, i) => (
              <TableRow key={i} data-state={item.getIsSelected() && 'selected'}>
                {item.getVisibleCells().map((value, key) => (
                  <TableCell key={key}>
                    {flexRender(
                      value.column.columnDef.cell,
                      value.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>Sem resultados</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination />
    </div>
  )
}
