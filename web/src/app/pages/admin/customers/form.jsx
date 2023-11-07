import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { patch } from '../../../../libs/fetcher'
import { useCustomer } from '../../../../hooks/use-customer'
import useApp from '../../../../hooks/use-app'
import FormAddress from '../../../components/ui/form/public/setting/form-address'
import FormProfile from '../../../components/ui/form/public/setting/form-profile'
import Heading from '../../../components/ui/heading'
import Button from '../../../components/ui/button/button'
import CheckboxToggleLabel from '../../../components/ui/input/checkboxtoggle-label'

export default function Form() {
  const { id } = useParams()
  const customer = useCustomer(id)
  const navigate = useNavigate()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { status: customer.status },
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const { success, message } = await patch(
      `/customers/${customer._id}/toggle-status`,
      values
    )
    setIsLoading(false)
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <section className="flex-grow flex flex-col gap-6">
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
        <FormProfile user={customer} isAdmin />
      </div>
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Endereço" />
        <FormAddress user={customer} isAdmin />
      </div>
    </section>
  )
}
