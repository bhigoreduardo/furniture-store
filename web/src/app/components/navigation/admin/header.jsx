import {
  List,
  GlobeSimple,
  ChatTeardropDots,
  BellSimpleRinging,
} from 'phosphor-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

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
  const { isSidebar, toggleSidebar } = useAdmin()
  const { user, handleUpdateUser } = useUser()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { available: user?.available || false },
    onSubmit: async (values) => {
      const { user, token } = await patch(
        '/stores/toggle-available',
        values,
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
              icon={
                <GlobeSimple
                  size={20}
                  weight="duotone"
                  className="text-white"
                />
              }
              className="flex-row-reverse bg-orange-600 text-white !py-1 !px-2"
            />
            <CheckboxToggleLabel
              id="available"
              name="available"
              onChange={() => {
                formik.setFieldValue('available', !formik.values.available)
                formik.handleSubmit()
              }}
              checked={formik.values.available}
            />
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
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-10 h-10 rounded-full"
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
