/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '../../../button/button'
import InputLabel from '../../../input/input-label'

const validationSchema = yup.object().shape({
  facebook: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
  instagram: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
  twitter: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
  linkedin: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
  pinterest: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
  youtube: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Informe um perfil válido'
    )
    .optional(),
})
const initialValues = {
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: '',
  pinterest: '',
  youtube: '',
}

export default function FormSocial({ user }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user?.socialMedia ?? initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => console.log(values)
  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex gap-4">
          <InputLabel
            id="facebook"
            label="Facebook"
            placeholder="Infome perfil facebook"
            name="facebook"
            error={formik.touched.facebook && formik.errors.facebook}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.facebook}
            className="flex-grow"
          />
          <InputLabel
            id="instagram"
            label="Instagram"
            placeholder="Infome perfil instagram"
            name="instagram"
            error={formik.touched.instagram && formik.errors.instagram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.instagram}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="twitter"
            label="Twitter"
            placeholder="Infome perfil twitter"
            name="twitter"
            error={formik.touched.twitter && formik.errors.twitter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.twitter}
            className="flex-grow"
          />
          <InputLabel
            id="linkedin"
            label="Linkedin"
            placeholder="Infome perfil linkedin"
            name="linkedin"
            error={formik.touched.linkedin && formik.errors.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.linkedin}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <InputLabel
            id="pinterest"
            label="Pinterest"
            placeholder="Infome perfil pinterest"
            name="pinterest"
            error={formik.touched.pinterest && formik.errors.pinterest}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pinterest}
            className="flex-grow"
          />
          <InputLabel
            id="youtube"
            label="Youtube"
            placeholder="Infome perfil youtube"
            name="youtube"
            error={formik.touched.youtube && formik.errors.youtube}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.youtube}
            className="flex-grow"
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
