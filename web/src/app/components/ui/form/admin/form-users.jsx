/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { patch } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import Heading from '../../heading'
import CheckboxToggleLabel from '../../input/checkboxtoggle-label'
import FormAddress from '../form-address'
import FormPassword from '../form-password'
import FormProfile from '../form-profile'

export default function FormUsers({ user, isAdmin = false, endPoint }) {
  const { setIsLoading, setRefetch } = useApp()
  const navigate = useNavigate()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { status: user.status || false },
    onSubmit: async (values) =>
      await patch(
        `/users/${user._id}/toggle-status`,
        values,
        setIsLoading,
        toast,
        setRefetch
      ),
  })

  return (
    <div className="flex flex-col gap-6">
      {Object.keys(user)?.length !== 0 && isAdmin && (
        <CheckboxToggleLabel
          id="status"
          name="status"
          label="Status"
          onChange={() => {
            formik.setFieldValue('status', !formik.values.status)
            formik.handleSubmit()
          }}
          checked={formik.values.status}
        />
      )}
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading
          title="Dados pessoais"
          btn={
            <Button
              label="Voltar"
              icon={<ArrowLeft size={16} className="text-white" />}
              className="bg-orange-500 text-white hover:bg-orange-600 !py-2 flex-row-reverse"
              onClick={() => navigate(-1)}
            />
          }
        />
        <FormProfile user={user} isAdmin endPoint={endPoint} />
      </div>
      {Object.keys(user)?.length !== 0 && (
        <>
          <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
            <Heading title="Endereço" />
            <FormAddress user={user} isAdmin endPoint={endPoint} />
          </div>
          {!isAdmin && (
            <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
              <Heading title="Segurança" />
              <FormPassword />
            </div>
          )}
        </>
      )}
    </div>
  )
}
