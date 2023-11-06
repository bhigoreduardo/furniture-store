import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { patch } from '../../../../../../libs/fetcher'
import useApp from '../../../../../../hooks/use-app'
import Button from '../../../button/button'
import PasswordLabel from '../../../input/password-label'

const validationSchema = yup.object().shape({
  password: yup.string().required('Senha atual é obrigatório'),
  newPassword: yup.string().required('Nova senha é obrigatório'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Devem ser igual a nova senha')
    .required('Repetir nova senha é obrigatório'),
})
const initialValues = {
  password: '',
  newPassword: '',
  repeatPassword: '',
}

export default function FormPassword() {
  const { setIsLoading } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    setIsLoading(true)
    const { success, message } = await patch(
      '/customers/change-password',
      values
    )
    if (success) {
      toast.success(message)
      formik.resetForm()
    } else {
      toast.error(message)
    }
    setIsLoading(false)
  }
  return (
    <form className="flex flex-col gap-6 px-6" onSubmit={formik.handleSubmit}>
      <div className="flex gap-4">
        <PasswordLabel
          id="password"
          label="Senha atual"
          placeholder="Senha atual"
          name="password"
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="flex-grow"
        />
        <PasswordLabel
          id="newPassword"
          label="Nova senha"
          placeholder="Senha com +6 caracteres"
          name="newPassword"
          error={formik.touched.newPassword && formik.errors.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          className="flex-grow"
        />
        <PasswordLabel
          id="repeatPassword"
          label="Repetir senha"
          placeholder="Repetir nova senha"
          name="repeatPassword"
          error={formik.touched.repeatPassword && formik.errors.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          className="flex-grow"
        />
      </div>
      <Button
        type="submit"
        label="Salvar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
