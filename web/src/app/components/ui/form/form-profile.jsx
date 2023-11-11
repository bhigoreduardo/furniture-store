/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { formDataUpload } from '../../../../utils/format'
import { post, put } from '../../../../libs/fetcher'
import useApp from '../../../../hooks/use-app'
import useUser from '../../../../hooks/use-user'
import Button from '../button/button'
import FileLabel from '../input/file-label'
import InputLabel from '../input/input-label'

const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  whatsApp: yup.string().required('Número de telefone é obrigatório'),
})

export default function FormProfile({ user, isAdmin = false, endPoint }) {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const { handleUpdateUser } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: user?.image || '',
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      whatsApp: user?.whatsApp || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    let response
    if (Object.keys(user)?.length !== 0) {
      delete values.email
      if (typeof values.image !== 'string') values = formDataUpload(values)
      response = await put(endPoint, values, setIsLoading, toast)
      if (!isAdmin) handleUpdateUser(response.user, response.token)
    } else if (isAdmin) {
      delete values.image
      response = await post(endPoint, values, setIsLoading, toast)
    }
    if (isAdmin && response?.success) {
      setRefetch(true)
      navigate(-1)
    }
  }

  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        {Object.keys(user)?.length !== 0 && (
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
        )}
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
              disabled={!!Object.keys(user)?.length}
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
