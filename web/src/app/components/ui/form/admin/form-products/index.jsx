/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { formDataUpload, typeOfString } from '../../../../../../utils/format'
import { post, put } from '../../../../../../libs/fetcher'
import useApp from '../../../../../../hooks/use-app'
import Button from '../../../button/button'
import FormAdditional from './form-additional'
import FormBrand from './form-brand'
import FormCategory from './form-category'
import FormDataProduct from './form-data'
import FormDescription from './form-description'
import FormIdentity from './form-identity'
import FormPublished from './form-published'
import FormSeo from './form-seo'
import FormSpecification from './form-specification'
import FormTag from './form-tag'

export const validationOtherInfosSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Descrição é obrigatório'),
})
export const initialOtherInfosValues = {
  title: '',
  description: '',
}
export const validationInventoryInfoSchema = yup.object().shape({
  color: yup.string().required('Cor é obrigatório'),
  stock: yup.number().required('Quantidade é obrigatório'),
  price: yup.number().required('Preço é obrigatório'),
  offer: yup
    .object({
      offerValue: yup.number().optional(),
      offerType: yup.string().optional(),
      offerPrice: yup.number().optional(),
      offerPriceDates: yup.array().optional(),
    })
    .optional(),
  featured: yup.bool().required('Pronta entrega é obrigatório'),
})
const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  sku: yup.string().optional(),
  code: yup.string().optional(),
  status: yup.bool().required('Status é obrigatório'),
  description: yup
    .object({
      overview: yup.string().required('Descrição é obrigatório'),
      otherInfos: yup.array().of(validationOtherInfosSchema).optional(),
    })
    .required('Descrição é obrigatório'),
  additional: yup
    .object({
      detail: yup.string().required('Detalhe é obrigatório'),
      otherInfos: yup.array().of(validationOtherInfosSchema).optional(),
    })
    .required('Informação adicional é obrigatório'),
  specification: yup
    .array()
    .of(validationOtherInfosSchema)
    .min(1, 'Pelo menos 1 especificação é obrigatório'),
  productData: yup.object({
    inventory: yup.object({
      manageStock: yup.bool().required('Controle de estoque é obrigatório'),
      stockStatus: yup.bool().required('Exibir estoque é obrigatório'),
      lowStockWarning: yup.bool().required('Aviso de estoque é obrigatório'),
      info: yup
        .array()
        .of(validationInventoryInfoSchema)
        .min(1, 'Pelo menos 1 produto deve ser adicionado'),
    }),
    shippingInfo: yup
      .object({
        weight: yup.number().required('Peso é obrigatório'),
        length: yup.number().required('Comprimento é obrigatório'),
        width: yup.number().required('Largura é obrigatório'),
        height: yup.number().required('Altura é obrigatório'),
        fee: yup.number().optional(),
        timeDelivery: yup.number().required('Tempo de entrega é obrigatório'),
        isFree: yup.bool().required('Frete grátis é obrigatório'),
      })
      .required('Informações de entrega é obrigatório'),
  }),
  seoData: yup
    .object({
      slug: yup.string().required('Slug é obrigatório'),
      metaTitle: yup.string().required('Título é obrigatório'),
      metaDescription: yup.string().optional(),
    })
    .required('Dados de busca é obrigatório'),
  published: yup
    .object({
      step: yup.string().required('Etapa da publicação é obrigatório'),
      visibility: yup
        .string()
        .required('Visibilidade da publicação é obrigatório'),
    })
    .required('Publicação é obrigatório'),
  category: yup
    .array()
    .of(yup.string())
    .min(1, 'Pelo menos 1 categoria deve ser selecionada'),
  brand: yup.string().required('Marca é obrigatório'),
  tags: yup.array(yup.string()).optional(),
  cover: yup.string().required('Frete é obrigatório'),
  backCover: yup.string().required('Verso é obrigatório'),
  gallery: yup.array().of(yup.string()).min(2, 'Mínimo 2 imagens'),
  video: yup.string().optional(),
})
const initialValues = {
  name: '',
  sku: '',
  code: '',
  status: true,
  description: {
    overview: '',
    otherInfos: [],
  },
  additional: {
    detail: '',
    otherInfos: [],
  },
  specification: [],
  productData: {
    inventory: {
      manageStock: true,
      stockStatus: true,
      lowStockWarning: true,
      info: [],
    },
    shippingInfo: {
      weight: '',
      length: '',
      width: '',
      height: '',
      fee: 0,
      timeDelivery: '',
      isFree: false,
    },
  },
  seoData: {
    slug: '',
    metaTitle: '',
    metaDescription: '',
  },
  published: {
    step: '',
    visibility: '',
  },
  category: [],
  brand: '',
  tags: [],
  cover: '',
  backCover: '',
  gallery: [],
  video: '',
}

export default function FormProducts({ data }) {
  const navigate = useNavigate()
  const { setIsLoading, setRefetch } = useApp()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data
      ? {
          ...data,
          category: data?.category?.map((item) => item._id),
          brand: data?.brand?._id,
          cover: data?.productData?.media?.cover,
          backCover: data?.productData?.media?.backCover,
          gallery: data?.productData?.media?.gallery,
          video: data?.productData?.media?.video,
        }
      : initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    let response
    validationSchema.cast(values, { stripUnknown: true })
    const imageEndpoint = '/save-image'
    let { cover, backCover, gallery } = values
    if (!typeOfString(cover)) {
      const { image } = await post(
        imageEndpoint,
        formDataUpload({ image: cover }),
        setIsLoading,
        null
      )
      cover = image
    }
    if (!typeOfString(backCover)) {
      const { image } = await post(
        imageEndpoint,
        formDataUpload({ image: backCover }),
        setIsLoading,
        null
      )
      backCover = image
    }
    const galleryUrls = await Promise.all(
      [...gallery].map(async (item) => {
        if (!typeOfString(item)) {
          const { image } = await post(
            imageEndpoint,
            formDataUpload({ image: item }),
            setIsLoading,
            null
          )
          return image
        } else {
          return item
        }
      })
    )
    gallery = galleryUrls

    if (data && Object.keys(data)?.length !== 0) {
      delete values._id
      delete values.__v
      delete values.createdAt
      delete values.updatedAt
      delete values.productData.media
      delete values.rangePrice
      response = await put(
        `/products/${data._id}`,
        { ...values, cover, backCover, gallery },
        setIsLoading,
        toast,
        setRefetch
      )
    } else
      response = await post(
        '/products',
        { ...values, cover, backCover, gallery },
        setIsLoading,
        toast,
        setRefetch
      )

    if (response?.success) navigate(-1)
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex gap-6 justify-between">
        <div className="flex-grow flex flex-col gap-6">
          <FormIdentity formik={formik} />
          <FormDescription formik={formik} />
          <FormAdditional formik={formik} />
          <FormSpecification formik={formik} />
          <FormDataProduct formik={formik} />
          <FormSeo formik={formik} />
        </div>
        <div className="flex flex-col gap-6 w-[350px] min-w-[350px]">
          <Button
            type="submit"
            label="Salvar"
            className="bg-orange-500 text-white hover:bg-orange-600 !p-2 h-[42px]"
          />
          <FormPublished formik={formik} />
          <FormCategory formik={formik} wrapper />
          <FormBrand formik={formik} wrapper />
          <FormTag formik={formik} />
        </div>
      </div>
    </form>
  )
}
