/* eslint-disable react/prop-types */
import Button from '../button/button'
import Modal from './modal'

export default function AlertModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal
      title="Tem certeza?"
      description={message || 'Está ação não pode ser revertida'}
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[400px]"
    >
      <div className="px-6 space-x-2 flex items-center justify-end w-full">
        <Button
          label="Cancelar"
          onClick={onClose}
          className="bg-slate-700 text-white"
        />
        <Button
          label="Confirmar"
          onClick={onConfirm}
          className="text-white bg-red-500"
        />
      </div>
    </Modal>
  )
}
