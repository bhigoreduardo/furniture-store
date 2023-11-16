import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Stack } from 'phosphor-react'

import Container from '../../../components/ui/container'
import Button from '../../../components/ui/button/button'

export default function CheckoutSuccess() {
  const navigate = useNavigate()
  return (
    <Container className="flex flex-col items-center gap-6 justify-center py-[100px]">
      <CheckCircle size={50} weight="duotone" className="text-green-500" />
      <div className="flex flex-col items-center gap-3">
        <h4 className="font-semibold text-4xl-text-gray-900">
          Seu pedido foi realizado com sucesso
        </h4>
        <span className="text-base text-gray-600">
          Acesse sua conta e acompanhe o status do seu pedido ou navegue em
          nossa loja e veja outros produtos.
        </span>
        <div className="flex items-center gap-4">
          <Button
            label="Acessar conta"
            icon={<Stack size={20} className="!transition-all !duration-0" />}
            onClick={() => navigate('/conta')}
            className="flex-row-reverse text-orange-500 !border-orange-200 hover:bg-orange-600 hover:text-white"
          />
          <Button
            label="Meus pedidos"
            icon={<ArrowRight size={20} className="text-white" />}
            onClick={() => navigate('/conta/pedidos')}
            className="flex-row-reverse bg-orange-500 text-white hover:bg-orange-600"
          />
        </div>
      </div>
    </Container>
  )
}
