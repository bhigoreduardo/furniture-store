/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import useUser from '../../../../../../hooks/use-user'
import { formDataUpload } from '../../../../../../utils/format'
import Button from '../../../button/button'
import FileLabel from '../../../input/file-label'
import InputLabel from '../../../input/input-label'
import useApp from '../../../../../../hooks/use-app'
import { put } from '../../../../../../libs/fetcher'

const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  whatsApp: yup.string().required('Número de telefone é obrigatório'),
})

export default function FormProfile({ user, isAdmin = false }) {
  const { handleUpdateUser } = useUser()
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: user.image,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      whatsApp: user.whatsApp,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    delete values.email
    setIsLoading(true)
    const endPoint = isAdmin
      ? `/customers/update/${user._id}/admin`
      : '/customers/update'
    if (typeof values.image !== 'string') values = formDataUpload(values)
    const {
      success,
      message,
      user: userData,
      token,
    } = await put(endPoint, values)
    setIsLoading(false)
    if (success) {
      toast.success(message)
      if (!isAdmin) handleUpdateUser(userData, token)
    } else {
      toast.error(message)
    }
  }
  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        <FileLabel
          id="image"
          label="Imagem"
          name="image"
          info="800*800"
          error={formik.touched.image && formik.errors.image}
          onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
          onBlur={formik.handleBlur}
          value={formik.values.image}
          onClear={() => formik.setFieldValue('image', '')}
        />
        <div className="flex-grow flex flex-col gap-4">
          <div className="flex gap-4">
            <InputLabel
              id="name"
              label="Nome"
              placeholder="Infome nome completo"
              name="name"
              error={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="flex-grow"
            />
            <InputLabel
              id="email"
              label="Email"
              placeholder="Infome email"
              name="email"
              error={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="flex-grow"
              disabled
            />
          </div>
          <div className="flex gap-4">
            <InputLabel
              id="cpf"
              label="CPF"
              placeholder="Infome o CPF"
              name="cpf"
              error={formik.touched.cpf && formik.errors.cpf}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cpf}
              className="flex-grow"
            />
            <InputLabel
              id="whatsApp"
              label="WhatsApp"
              placeholder="Infome seu whatsApp"
              name="whatsApp"
              error={formik.touched.whatsApp && formik.errors.whatsApp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.whatsApp}
              className="flex-grow"
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
