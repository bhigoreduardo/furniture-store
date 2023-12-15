import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import {
  List,
  GlobeSimple,
  ChatTeardropDots,
  BellSimpleRinging,
  User,
} from 'phosphor-react'

import { UserEnum } from '../../../../types/user-type'
import { patch } from '../../../../libs/fetcher'
import useUser from '../../../../hooks/use-user'
import useApp from '../../../../hooks/use-app'
import useAdmin from '../../../../hooks/use-admin'
import Container from '../../ui/container'
import Logo from '../../ui/logo'
import Button from '../../ui/button/button'
import Badge from '../../ui/badge'
import CheckboxToggleLabel from '../../ui/input/checkboxtoggle-label'

export default function Header() {
  const navigate = useNavigate()
  const { isSidebar, toggleSidebar } = useAdmin()
  const { user, handleUpdateUser } = useUser()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { available: user?.available || false },
    onSubmit: async () => {
      const { user, token } = await patch(
        '/stores/toggle-available',
        {},
        setIsLoading,
        toast
      )
      handleUpdateUser(user, token)
    },
  })

  return (
    <header className="bg-blue-900 text-white border-b border-gray-600">
      <Container className="flex items-center justify-start gap-6 py-3">
        <Logo
          className={`w-full ${isSidebar ? 'max-w-[270px]' : 'max-w-[50px]'}`}
        />
        <div className="flex-grow flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleSidebar}>
              <List size={20} className="text-white" />
            </button>
            <Button
              label="Acessar loja"
              onClick={() => navigate('/')}
              icon={
                <GlobeSimple
                  size={20}
                  weight="duotone"
                  className="text-white"
                />
              }
              className="flex-row-reverse bg-orange-600 text-white !py-1 !px-2"
            />
            {user?._type === UserEnum.Store && (
              <CheckboxToggleLabel
                id="available"
                name="available"
                onChange={() => {
                  formik.setFieldValue('available', !formik.values.available)
                  formik.handleSubmit()
                }}
                checked={formik.values.available}
              />
            )}
          </div>
          <div className="flex items-center gap-8">
            <button className="relative">
              <Badge
                content="4"
                className="absolute -top-4 left-3 bg-red-500 text-white"
              />
              <ChatTeardropDots
                size={24}
                weight="duotone"
                className="text-white"
              />
            </button>
            <button className="relative">
              <Badge
                content="+99"
                className="absolute -top-4 left-3 bg-red-500 text-white"
              />
              <BellSimpleRinging
                size={24}
                weight="duotone"
                className="text-white"
              />
            </button>
            <button>
              {user?.image ? (
                <img
                  src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${
                    user.image
                  }`}
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
              ) : (
                <User size={20} weight="duotone" className="text-white" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
