import {
  List,
  GlobeSimple,
  ChatTeardropDots,
  BellSimpleRinging,
} from 'phosphor-react'

import Container from '../../ui/container'
import Logo from '../../ui/logo'
import Button from '../../ui/button/button'
import Badge from '../../ui/badge'

export default function Header() {
  return (
    <header className="bg-blue-900 text-white border-b border-gray-600">
      <Container className="flex items-center justify-start gap-6 py-5">
        <Logo className="w-full max-w-[270px]" />
        <div className="flex-grow flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button>
              <List size={20} className="text-white" />
            </button>
            <Button
              label="Acessar loja"
              icon={<GlobeSimple size={20} className="text-white" />}
              className="flex-row-reverse bg-orange-500 text-white hover:bg-orange-600 !py-2"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative">
              <Badge
                content="4"
                className="absolute -top-4 left-3 bg-red-500 text-white"
              />
              <ChatTeardropDots size={24} className="text-white" />
            </button>
            <button className="relative">
              <Badge
                content="+99"
                className="absolute -top-4 left-3 bg-red-500 text-white"
              />
              <BellSimpleRinging size={24} className="text-white" />
            </button>
            <button>
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-12 h-12 rounded-full"
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
