/* eslint-disable react/prop-types */
import { useState } from 'react'

import Button from '../../../../button/button'
import FormWrapper from '../../form-wrapper'
import Media from './media'
import Stocked from './stocked'
import Shipped from './shipped'

const ACTIVED = 'bg-orange-500 text-white hover:bg-orange-600 border-[2px]'
const DESACTIVED =
  'text-orange-500 !border-orange-300 hover:text-white hover:bg-orange-600 hover:!border-orange-600 border-[2px]'

export default function FormData(props) {
  const [switchType, setSwitchType] = useState('media')
  const buttonActived = (type) => (type === switchType ? ACTIVED : DESACTIVED)
  return (
    <FormWrapper title="Dados do produto">
      <div className="flex gap-3">
        <Button
          label="Imagens"
          className={buttonActived('media')}
          onClick={() => setSwitchType('media')}
        />
        <Button
          label="Estoque"
          className={buttonActived('stocked')}
          onClick={() => setSwitchType('stocked')}
        />
        <Button
          label="Entrega"
          className={buttonActived('shipped')}
          onClick={() => setSwitchType('shipped')}
        />
      </div>
      {switchType === 'media' ? (
        <Media formik={props.formik} />
      ) : switchType === 'stocked' ? (
        <Stocked formik={props.formik} />
      ) : (
        <Shipped formik={props.formik} />
      )}
    </FormWrapper>
  )
}
