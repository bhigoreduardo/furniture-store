import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

import { patch } from '../../../../libs/fetcher'
import { useCustomer } from '../../../../hooks/admin/use-customer'
import useApp from '../../../../hooks/use-app'
import FormAddress from '../../../components/ui/form/form-address'
import FormProfile from '../../../components/ui/form/form-profile'
import Heading from '../../../components/ui/heading'
import Button from '../../../components/ui/button/button'
import CheckboxToggleLabel from '../../../components/ui/input/checkboxtoggle-label'

export default function Form() {
  const { id } = useParams()
  const { setIsLoading, setRefetch } = useApp()
  const navigate = useNavigate()
  const customer = useCustomer(id)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { status: customer.status },
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    await patch(
      `/customers/${customer._id}/toggle-status`,
      values,
      setIsLoading,
      toast,
      setRefetch
    )
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
        <FormProfile
          user={customer}
          isAdmin
          endPoint={`/customers/update/${customer._id}/admin`}
        />
      </div>
      <div className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2">
        <Heading title="Endereço" />
        <FormAddress
          user={customer}
          isAdmin
          endPoint={`/customers/update/${customer._id}/admin`}
        />
      </div>
    </section>
  )
}
