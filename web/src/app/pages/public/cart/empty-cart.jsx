import { useNavigate } from 'react-router-dom'
import { ArrowLeft, House } from 'phosphor-react'

import Button from '../../../components/ui/button/button'
import Container from '../../../components/ui/container'

export default function EmptyCart() {
  const navigate = useNavigate()
  return (
    <Container className="flex items-center justify-center gap-6 py-[100px]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 z-10">
          <h4 className="font-semibold text-4xl-text-gray-900">
            Carrinho vazio
          </h4>
          <span className="text-base text-gray-600">
            Navegue em nossa loja e escolha os produtos.
          </span>
          <div className="flex items-center gap-4">
            <Button
              label="Loja"
              icon={<ArrowLeft size={20} className="text-white" />}
              onClick={() => navigate('/produtos')}
              className="flex-row-reverse bg-orange-500 text-white hover:bg-orange-600"
            />
            <Button
              label="Início"
              icon={<House size={20} className="!transition-all !duration-0" />}
              onClick={() => navigate('/')}
              className="flex-row-reverse text-orange-500 !border-orange-200 hover:bg-orange-600 hover:text-white"
            />
          </div>
        </div>
        <img
          src="/images/empty-cart.svg"
          alt="Carrinho vazio"
          className="-mt-52 z-0"
        />
      </div>
    </Container>
  )
}
