import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'phosphor-react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import {
  cartCalculate,
  currencyPrice,
  parsedSelectData,
  removeDataMask,
} from '../../../../../utils/format'
import {
  creditCardNumberMask,
  mobileMask,
  zipCodeMask,
} from '../../../../../utils/mask'
import { post } from '../../../../../libs/fetcher'
import useApp from '../../../../../hooks/use-app'
import useUser from '../../../../../hooks/use-user'
import InputLabel from '../../input/input-label'
import TextAreaLabel from '../../input/textarea-label'
import Button from '../../button/button'
import CartItem from '../../cart-item'
import RadioBox from '../../input/radiobox'
import SelectLabel from '../../input/select-label'
import IconHint from '../../icon/icon-hint'

const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .matches(/\S+@\S+\.\S+/, 'Informe email válido')
    .required('Email é obrigatório'),
  whatsApp: yup.string().required('Número de telefone é obrigatório'),
  address: yup
    .object({
      street: yup.string().required('Rua é obrigatório'),
      neighborhood: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      state: yup
        .string()
        .max(2, 'Informe somente a UF. Ex.: SP')
        .required('Estado é obrigatório'),
      number: yup.string().optional(),
      zipCode: yup.string().required('CEP é obrigatório'),
      complement: yup.string().optional(),
    })
    .required('Endereço é obrigatório'),
  payment: yup
    .object({
      method: yup.string().required('Forma de pagamento é obrigatório'),
      availableInstallments: yup.bool(),
      cardName: yup
        .string()
        .when('availableInstallments', (value) =>
          value.includes(true)
            ? yup.string().required('Nome no cartão é obrigatório')
            : yup.string().optional()
        ),
      cardNumber: yup
        .string()
        .when('availableInstallments', (value) =>
          value.includes(true)
            ? yup.string().required('Número do cartão é obrigatório')
            : yup.string().optional()
        ),
      cardDate: yup
        .string()
        .when('availableInstallments', (value) =>
          value.includes(true)
            ? yup.string().required('Data do cartão é obrigatório')
            : yup.string().optional()
        ),
      cardCvv: yup
        .string()
        .when('availableInstallments', (value) =>
          value.includes(true)
            ? yup.string().required('CVV é obrigatório')
            : yup.string().optional()
        ),
      installments: yup
        .string()
        .when('availableInstallments', (value) =>
          value.includes(true)
            ? yup.string().required('Parcelas é obrigatório')
            : yup.string().optional()
        ),
    })
    .required('Pagamento é obrigatório'),
  obs: yup.string().optional(),
  cart: yup
    .array()
    .of(
      yup.object({
        product: yup.string().required('Produto é obrigatório'),
        color: yup.string().required('Cor é obrigatório'),
        quantity: yup.number().required('Quantidade é obrigatório'),
      })
    )
    .min(1, 'Pelo menos um produto é obrigatório'),
})
const initialValues = {
  name: '',
  email: '',
  whatsApp: '',
  address: {
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    zipCode: '',
    complement: '',
  },
  payment: {
    method: '',
    availableInstallments: false,
    cardName: '',
    cardNumber: '',
    cardDate: '',
    cardCvv: '',
    installments: '',
  },
  obs: '',
}

export default function FormCheckout() {
  const navigate = useNavigate()
  const { payment, cartItems, setIsLoading, handleCartItems } = useApp()
  const { user } = useUser()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialValues, ...user, cart: cartItems },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  })
  const handleSubmit = async (values) => {
    values = validationSchema.cast(values, { stripUnknown: true })
    values = removeDataMask(values, ['whatsApp'])
    values.address = removeDataMask(values.address, ['zipCode'])
    const { success } = await post('/orders', values, setIsLoading, toast)
    if (success) {
      handleCartItems([])
      navigate('/compra-concluida')
    }
  }
  const parsedPayment =
    !formik.values?.payment?.availableInstallments ||
    !formik.values?.payment?.method ||
    !payment
      ? null
      : payment.find((item) => item._id === formik.values?.payment?.method)
  const parsedInstallments = !parsedPayment
    ? []
    : parsedSelectData(
        parsedPayment.infoInstallments.map((item) => ({
          _id: item.installments,
          installments: `${item.installments}x ${
            Number(item.fee) !== 0 ? `+ ${item.fee}%a.m.` : 'sem juros'
          }`,
        })),
        '_id',
        'installments'
      )
  const { subAmount, discount, shippingFee } = cartCalculate(cartItems)
  const infoInstallment = !parsedPayment
    ? 0
    : parsedPayment.infoInstallments.find(
        (item) =>
          Number(item.installments) ===
          Number(formik.values.payment.installments)
      )
  const clearFieldValues = (arr) =>
    arr.forEach((item) => formik.setFieldValue(item, ''))
  const paymentFee = !infoInstallment ? 0 : infoInstallment.fee

  return (
    <form className="flex items-start gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col gap-4 border border-gray-200 rounded-sm py-3">
          <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
            Informações de pagamento
          </h4>
          <div className="flex gap-4 px-6">
            <InputLabel
              id="name"
              label="Nome"
              placeholder="Infome nome do cliente"
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
              type="email"
              placeholder="Informe o email do cliente"
              name="email"
              error={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="flex-grow"
            />
            <InputLabel
              id="whatsApp"
              label="WhatsApp"
              type="whatsApp"
              placeholder="Informe o whatsApp do cliente"
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
          <div className="flex gap-4 px-6">
            <InputLabel
              id="address.street"
              label="Rua"
              placeholder="Infome nome da rua"
              name="address.street"
              error={
                formik.touched?.address?.street &&
                formik.errors?.address?.street
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.street}
              className="flex-grow"
            />
            <InputLabel
              id="address.neighborhood"
              label="Bairro"
              placeholder="Infome nome do bairro"
              name="address.neighborhood"
              error={
                formik.touched?.address?.neighborhood &&
                formik.errors?.address?.neighborhood
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.neighborhood}
              className="flex-grow"
            />
            <InputLabel
              id="address.city"
              label="Cidade"
              placeholder="Infome nome da cidade"
              name="address.city"
              error={
                formik.touched?.address?.city && formik.errors?.address?.city
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.city}
              className="flex-grow"
            />
          </div>
          <div className="flex gap-4 px-6">
            <InputLabel
              id="address.state"
              label="Estado"
              placeholder="Infome nome do estado"
              name="address.state"
              error={
                formik.touched?.address?.state && formik.errors?.address?.state
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.state}
              className="flex-grow"
            />
            <InputLabel
              id="address.number"
              label="Número"
              placeholder="Infome o número do endereço"
              name="address.number"
              error={
                formik.touched?.address?.number &&
                formik.errors?.address?.number
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.number}
              className="flex-grow"
            />
            <InputLabel
              id="address.zipCode"
              label="CEP"
              placeholder="Infome o CEP"
              name="address.zipCode"
              error={
                formik.touched?.address?.zipCode &&
                formik.errors?.address?.zipCode
              }
              onChange={(e) =>
                formik.setFieldValue(
                  'address.zipCode',
                  zipCodeMask(e.target.value)
                )
              }
              onBlur={formik.handleBlur}
              value={zipCodeMask(formik.values?.address?.zipCode)}
              className="flex-grow"
            />
            <InputLabel
              id="address.complement"
              label="Complemento"
              placeholder="Infome o complemento"
              name="address.complement"
              error={
                formik.touched?.address?.complement &&
                formik.errors?.address?.complement
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.address?.complement}
              className="flex-grow"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border border-gray-200 rounded-sm py-3">
          <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
            Método de pagamento
          </h4>
          <div className="flex items-center px-6 py-3">
            {payment?.map((item, i) => (
              <label
                key={item._id}
                htmlFor={item._id}
                className={`flex flex-col gap-1 justify-center items-center ${
                  payment.length !== i + 1 && 'border-r border-gray-200'
                } px-6`}
              >
                <img
                  src={`${import.meta.env.VITE_SERVER_PUBLIC_IMAGES}/${
                    item.image
                  }`}
                  alt={item.method}
                  className="w-10 h-10 object-cover"
                />
                <span className="font-semibold text-sm text-gray-900">
                  {item.name}
                </span>
                <RadioBox
                  name="payment.method"
                  value={item._id}
                  onChange={({ target: { value } }) => {
                    formik.setFieldValue('payment.method', value)
                    formik.setFieldValue(
                      'payment.availableInstallments',
                      item.availableInstallments
                    )
                    clearFieldValues([
                      'payment.cardName',
                      'payment.cardNumber',
                      'payment.cardDate',
                      'payment.cardCvv',
                      'payment.installments',
                    ])
                  }}
                />
              </label>
            ))}
          </div>
          {formik.touched?.payment?.method &&
            formik.errors?.payment?.method && (
              <span className="text-xs text-red-500 px-6">
                {formik.errors?.payment?.method}
              </span>
            )}
          {formik.values?.payment?.availableInstallments && (
            <div className="flex flex-col gap-4 px-6 border-t border-gray-200 pt-3">
              <div className="flex gap-4">
                <InputLabel
                  id="payment.cardName"
                  label="Nome no cartão"
                  placeholder="Infome nome escrito no cartão"
                  name="payment.cardName"
                  error={
                    formik.touched?.payment?.cardName &&
                    formik.errors?.payment?.cardName
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment?.cardName}
                  className="flex-grow"
                />
                <InputLabel
                  id="payment.cardNumber"
                  label="Número do cartão"
                  placeholder="Infome número escrito no cartão"
                  name="payment.cardNumber"
                  error={
                    formik.touched?.payment?.cardNumber &&
                    formik.errors?.payment?.cardNumber
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      'payment.cardNumber',
                      creditCardNumberMask(e.target.value)
                    )
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment?.cardNumber}
                  className="flex-grow"
                />
              </div>
              <div className="flex gap-4">
                <InputLabel
                  type="date"
                  id="payment.cardDate"
                  label="Data de validade"
                  placeholder="Infome data de validade escrito no cartão"
                  name="payment.cardDate"
                  error={
                    formik.touched?.payment?.cardDate &&
                    formik.errors?.payment?.cardDate
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment?.cardDate}
                  className="flex-grow"
                />
                <InputLabel
                  id="payment.cardCvv"
                  label="CVV"
                  placeholder="Infome CVV escrito no cartão"
                  name="payment.cardCvv"
                  error={
                    formik.touched?.payment?.cardCvv &&
                    formik.errors?.payment?.cardCvv
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment?.cardCvv}
                  className="flex-grow"
                />
                <SelectLabel
                  id="payment.installments"
                  label="Parcelas"
                  name="payment.installments"
                  placeholder="Selecione"
                  data={parsedInstallments}
                  error={
                    formik.touched?.payment?.installments &&
                    formik.errors?.payment?.installments
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment?.installments}
                  className="flex-grow"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-base text-gray-900">
            Informações adicionais
          </h4>
          <TextAreaLabel
            id="obs"
            label="Observação (opcional)"
            name="obs"
            placeholder="Observações sobre o pedido, ex: Embrulhar em papel presente"
            error={formik.touched.obs && formik.errors.obs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.obs}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex flex-col border border-gray-200 rounded-sm py-3 gap-4">
          <h4 className="font-semibold text-base text-gray-900 border-b border-gray-200 px-6 pb-3">
            Resumo do pedido
          </h4>
          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto px-6">
            {cartItems.map((item, i) => (
              <CartItem key={i} {...item} isCheckout />
            ))}
          </div>
          <div className="flex flex-col gap-2 px-6">
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Sub-Total:</span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount)}
              </span>
            </p>
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Entrega:</span>
              <span className="font-semibold">
                {currencyPrice.format(shippingFee)}
              </span>
            </p>
            <p className="flex items-center justify-between text-xs text-gray-900">
              <span className="font-normal">Desconto:</span>
              <span className="font-semibold">
                {currencyPrice.format(discount - subAmount)}
              </span>
            </p>
            <div className="flex items-center justify-between text-xs text-gray-900">
              <span className="relative flex items-center gap-1 font-normal">
                Taxa: <IconHint hint="Taxas de pagamentos" />
              </span>
              <span className="font-semibold">
                {currencyPrice.format(subAmount * (paymentFee / 100))}
              </span>
            </div>
          </div>
          <p className="flex items-center justify-between text-sm text-gray-900 border-t border-gray-200 px-6 pt-3">
            <span className="font-normal">Total:</span>
            <span className="font-semibold">
              {currencyPrice.format(
                (subAmount + shippingFee) * (1 + paymentFee / 100)
              )}
            </span>
          </p>
          <Button
            type="submit"
            label="Confirmar"
            icon={<ArrowRight size={20} className="text-white" />}
            className="bg-orange-500 text-white hover:bg-orange-600 mx-6"
          />
        </div>
      </div>
    </form>
  )
}
