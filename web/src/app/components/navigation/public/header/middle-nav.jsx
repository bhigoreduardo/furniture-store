import { useState } from 'react'
import {
  Heart,
  MagnifyingGlass,
  ShoppingCartSimple,
  User,
} from 'phosphor-react'

import Container from '../../../ui/container'
import Input from '../../../ui/input/input'
import Logo from '../../../ui/logo'
import CardAuth from '../../../ui/card/customer/card-auth'

export default function MiddleNav() {
  const [isCardAuth, setIsCardAuth] = useState(false)

  return (
    <div className="bg-blue-900 text-white border-b border-gray-600">
      <Container className="relative flex items-center justify-between gap-6 py-5">
        <Logo />
        <Input
          id="search"
          placeholder="Pesquise qualquer assunto..."
          name="search"
          icon={
            <MagnifyingGlass
              size={20}
              weight="duotone"
              className="text-gray-900"
            />
          }
          className="flex-grow max-w-[600px]"
        />
        <div className="flex items-center justify-between gap-4">
          <button className="relative">
            <span className="absolute -top-2 left-3 flex items-center justify-center font-semibold text-blue-900 text-xs h-4 w-4 rounded-full bg-white border border-blue-900">
              4
            </span>
            <ShoppingCartSimple
              size={20}
              weight="duotone"
              className="text-white"
            />
          </button>
          <button>
            <Heart size={20} weight="duotone" className="text-white" />
          </button>
          <button
            type="button"
            onClick={() => setIsCardAuth((prevState) => !prevState)}
          >
            <User size={20} weight="duotone" className="text-white" />
          </button>
        </div>
        {isCardAuth && (
          <CardAuth
            setIsCardAuth={setIsCardAuth}
            className="absolute right-6 top-[calc(100%-10px)]"
          />
        )}
      </Container>
    </div>
  )
}
