import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { post } from '../../../../../libs/fetcher'
import { starsReview } from '../../../../../types/product-type'
import useApp from '../../../../../hooks/use-app'
import Button from '../../button/button'
import SelectLabel from '../../input/select-label'
import TextAreaLabel from '../../input/textarea-label'
import useUser from '../../../../../hooks/use-user'

const validationSchema = yup.object().shape({
  image: yup.string().optional(),
  order: yup.string().required('Pedido é obrigatório'),
  cartItem: yup.string().required('Item é obrigatório'),
  stars: yup.number().required('Avaliação é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
})

export default function FormReview() {
  const { productReview, setIsLoading, setIsModalOpen, setRefetch } = useApp()
  const { user } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: user.image,
      order: productReview?.order ?? '',
      cartItem: productReview?.cartItem ?? '',
      stars: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    const { success } = await post(
      '/reviews/',
      values,
      setIsLoading,
      toast,
      setRefetch
    )
    if (success) setIsModalOpen(false)
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 px-6">
      <SelectLabel
        id="stars"
        label="Avaliação"
        name="stars"
        placeholder="Selecione"
        data={starsReview}
        error={formik.touched.stars && formik.errors.stars}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.stars}
      />
      <TextAreaLabel
        id="description"
        label="Descrição"
        name="description"
        placeholder="Informe a descrição da avaliação"
        error={formik.touched.description && formik.errors.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
      <Button
        type="submit"
        label="Avaliar"
        className="bg-orange-500 text-white hover:bg-orange-600 w-fit !p-2"
      />
    </form>
  )
}
