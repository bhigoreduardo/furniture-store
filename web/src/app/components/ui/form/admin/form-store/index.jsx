/* eslint-disable react/prop-types */
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  cnpjMask,
  ieMask,
  mobileMask,
  phoneMask,
} from '../../../../../../utils/mask'
import { formDataUpload, removeDataMask } from '../../../../../../utils/format'
import { patch } from '../../../../../../libs/fetcher'
import useApp from '../../../../../../hooks/use-app'
import useUser from '../../../../../../hooks/use-user'
import Button from '../../../button/button'
import ImageLabel from '../../../input/image-label'
import InputLabel from '../../../input/input-label'
import TextAreaLabel from '../../../input/textarea-label'

const validationSchema = yup.object().shape({
  _type: yup.string().required('Usuário tipo é obrigatório'),
  image: yup.string().required('Imagem é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  contactEmail: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email de contato é obrigatório'),
  phone: yup.string().required('Número de telefone é obrigatório'),
  whatsApp: yup.string().required('Número de telefone é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  ie: yup.string().required('IE é obrigatório'),
  clockAvailable: yup
    .string()
    .required('Horário de funcionamento é obrigatório'),
  site: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um endereço válido'
    )
    .required('Site é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
})

export default function FormStore({ user }) {
  const { setIsLoading } = useApp()
  const { handleUpdateUser } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _type: user?._type || '',
      image: user?.image || '',
      name: user?.name || '',
      email: user?.email || '',
      contactEmail: user?.contactEmail || '',
      phone: user?.phone || '',
      whatsApp: user?.whatsApp || '',
      cnpj: user?.cnpj || '',
      ie: user?.ie || '',
      clockAvailable: user?.clockAvailable || '',
      site: user?.site || '',
      description: user?.description || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    values = removeDataMask(values, ['phone', 'whatsApp', 'cnpj', 'ie'])
    if (typeof values.image !== 'string') values = formDataUpload(values)
    const { user: userData, token } = await patch(
      `/stores/${user._id}`,
      values,
      setIsLoading,
      toast,
      null
    )
    handleUpdateUser(userData, token)
  }

  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        <ImageLabel
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
              placeholder="Infome nome da loja"
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
            <InputLabel
              id="contactEmail"
              label="Email de contato"
              placeholder="Infome email de contato"
              name="contactEmail"
              error={formik.touched.contactEmail && formik.errors.contactEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactEmail}
              className="flex-grow"
            />
          </div>
          <div className="flex gap-4">
            <InputLabel
              id="phone"
              label="Telefone"
              placeholder="Infome o telefone"
              name="phone"
              error={formik.touched.phone && formik.errors.phone}
              onChange={(e) =>
                formik.setFieldValue('phone', phoneMask(e.target.value))
              }
              onBlur={formik.handleBlur}
              value={phoneMask(formik.values.phone)}
              className="flex-grow"
            />
            <InputLabel
              id="whatsApp"
              label="WhatsApp"
              placeholder="Infome seu whatsApp"
              name="whatsApp"
              error={formik.touched.whatsApp && formik.errors.whatsApp}
              onChange={(e) =>
                formik.setFieldValue('whatsApp', mobileMask(e.target.value))
              }
              onBlur={formik.handleBlur}
              value={mobileMask(formik.values.whatsApp)}
              className="flex-grow"
            />
          </div>
          <div className="flex gap-4">
            <InputLabel
              id="cnpj"
              label="CNPJ"
              placeholder="Infome o CNPJ"
              name="cnpj"
              error={formik.touched.cnpj && formik.errors.cnpj}
              onChange={(e) =>
                formik.setFieldValue('cnpj', cnpjMask(e.target.value))
              }
              onBlur={formik.handleBlur}
              value={cnpjMask(formik.values.cnpj)}
              className="flex-grow"
            />
            <InputLabel
              id="ie"
              label="IE"
              placeholder="Infome seu IE"
              name="ie"
              error={formik.touched.ie && formik.errors.ie}
              onChange={(e) =>
                formik.setFieldValue('ie', ieMask(e.target.value))
              }
              onBlur={formik.handleBlur}
              value={ieMask(formik.values.ie)}
              className="flex-grow"
            />
          </div>
          <div className="flex gap-4">
            <InputLabel
              id="clockAvailable"
              label="Horário de funcionamento"
              placeholder="Infome horário de funcionamento"
              name="clockAvailable"
              hint="Separe os horário com ',' (vírgula). Ex: Seg à Sex: 8-18h, Sáb: 8-12h"
              error={
                formik.touched.clockAvailable && formik.errors.clockAvailable
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.clockAvailable}
              className="flex-grow"
            />
            <InputLabel
              id="site"
              label="Site"
              placeholder="Infome o site"
              name="site"
              error={formik.touched.site && formik.errors.site}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.site}
              className="flex-grow"
            />
          </div>
          <TextAreaLabel
            id="description"
            label="Descrição"
            name="description"
            hint="Breve resumo sobre a loja, tente usar até no máximo 500 caracteres"
            placeholder="Informe a descrição"
            error={formik.touched.description && formik.errors.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
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
