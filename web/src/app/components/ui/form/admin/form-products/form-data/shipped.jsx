/* eslint-disable react/prop-types */
import CheckboxToggleLabel from '../../../../input/checkboxtoggle-label'
import InputLabel from '../../../../input/input-label'

export default function Shipped(props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <InputLabel
          id="productData.shippingInfo.weight"
          name="productData.shippingInfo.weight"
          type="number"
          label="Peso"
          placeholder="Infome o peso"
          error={
            props.formik.touched?.productData?.shippingInfo?.weight &&
            props.formik.errors?.productData?.shippingInfo?.weight
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.weight}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="productData.shippingInfo.length"
          name="productData.shippingInfo.length"
          type="number"
          label="Comprimento"
          placeholder="Infome o comprimento"
          error={
            props.formik.touched?.productData?.shippingInfo?.length &&
            props.formik.errors?.productData?.shippingInfo?.length
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.length}
          className="flex-grow flex-1"
        />
      </div>
      <div className="flex gap-4">
        <InputLabel
          id="productData.shippingInfo.width"
          name="productData.shippingInfo.width"
          type="number"
          label="Largura"
          placeholder="Infome a largura"
          error={
            props.formik.touched?.productData?.shippingInfo?.width &&
            props.formik.errors?.productData?.shippingInfo?.width
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.width}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="productData.shippingInfo.height"
          name="productData.shippingInfo.height"
          type="number"
          label="Altura"
          placeholder="Infome a altura"
          error={
            props.formik.touched?.productData?.shippingInfo?.height &&
            props.formik.errors?.productData?.shippingInfo?.height
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.height}
          className="flex-grow flex-1"
        />
      </div>
      <CheckboxToggleLabel
        id="productData.shippingInfo.isFree"
        name="productData.shippingInfo.isFree"
        label="Frete grátis"
        error={
          props.formik.touched?.productData?.shippingInfo?.isFree &&
          props.formik.errors?.productData?.shippingInfo?.isFree
        }
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        value={props.formik.values?.productData?.shippingInfo?.isFree}
      />
      <div className="flex gap-4">
        <InputLabel
          id="productData.shippingInfo.timeDelivery"
          name="productData.shippingInfo.timeDelivery"
          type="number"
          label="Tempo de entrega"
          placeholder="Infome o tempo de entrega"
          error={
            props.formik.touched?.productData?.shippingInfo?.timeDelivery &&
            props.formik.errors?.productData?.shippingInfo?.timeDelivery
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.timeDelivery}
          className="flex-grow flex-1"
        />
        <InputLabel
          id="productData.shippingInfo.fee"
          name="productData.shippingInfo.fee"
          type="number"
          label="Preço"
          placeholder="Infome o preço do frete"
          error={
            props.formik.touched?.productData?.shippingInfo?.fee &&
            props.formik.errors?.productData?.shippingInfo?.fee
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.productData?.shippingInfo?.fee}
          className="flex-grow flex-1"
        />
      </div>
    </div>
  )
}
