/* eslint-disable react/prop-types */
import { forwardRef } from 'react'
import { mergeClassName } from '../../../../utils/format'

export const Table = forwardRef(function Table({ className, ...props }, ref) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={mergeClassName('w-full', className)}
        {...props}
      />
    </div>
  )
})

export const TableHeader = forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return (
    <thead
      ref={ref}
      className={mergeClassName('bg-gray-100', className)}
      {...props}
    />
  )
})

export const TableBody = forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return (
    <tbody ref={ref} className={mergeClassName('', className)} {...props} />
  )
})

export const TableRow = forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      className={mergeClassName(
        'flex items-center justify-between gap-1 px-6 py-3',
        className
      )}
      {...props}
    />
  )
})

export const TableHead = forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th
      ref={ref}
      className={mergeClassName(
        'flex-1 last-of-type:w-[130px] last-of-type:flex-none text-left font-semibold text-xs uppercase text-gray-600',
        className
      )}
      {...props}
    />
  )
})

export const TableCell = forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return (
    <td
      ref={ref}
      className={mergeClassName(
        'flex-1 last-of-type:w-[130px] last-of-type:flex-none text-sm text-gray-600 text-left',
        className
      )}
      {...props}
    />
  )
})
