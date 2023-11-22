/* eslint-disable react/prop-types */
import { forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XCircle } from 'phosphor-react'

import { mergeClassName } from '../../../../utils/format'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal className={className} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)

const DialogOverlay = forwardRef(function DialogOverlay(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={mergeClassName(
        'fixed inset-0 z-50 backdrop-blur-sm bg-black bg-opacity-80 duration-300 ease-in-out',
        className
      )}
      {...props}
    />
  )
})

const DialogContent = forwardRef(function DialogContent(
  { className, children, ...props },
  ref
) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={mergeClassName(
          'fixed top-1/2 -translate-y-1/2 backdrop-blur-md bg-white z-50 w-full flex flex-col gap-6 py-6 rounded-sm border border-gray-100 shadow-sm',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute -right-8 top-0 rounded-sm text-gray-200 hover:text-orange-500 duration-300 ease-in-out">
          <XCircle size={24} weight="duotone" />
          <span className="sr-only">Fechar</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

const DialogHeader = ({ className, ...props }) => (
  <div
    className={mergeClassName(
      'flex flex-col gap-1 border-b pb-6 px-6 border-gray-200',
      className
    )}
    {...props}
  />
)

const DialogTitle = forwardRef(function DialogTitle(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={mergeClassName(
        'text-sm uppercase font-semibold text-gray-900',
        className
      )}
      {...props}
    />
  )
})

const DialogDescription = forwardRef(function DialogDescription(
  { className, ...props },
  ref
) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={mergeClassName('text-sm text-gray-900', className)}
      {...props}
    />
  )
})

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
