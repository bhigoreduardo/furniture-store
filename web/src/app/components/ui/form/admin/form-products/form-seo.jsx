/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import slugify from 'slugify'

import InputLabel from '../../../input/input-label'
import TextAreaLabel from '../../../input/textarea-label'
import FormWrapper from '../form-wrapper'

export default function FormSeo(props) {
  const handleClear = () => {
    props.formik.setFieldValue('seoData.metaTitle', '')
    props.formik.setFieldValue('seoData.slug', '')
    props.formik.setFieldValue('seoData.metaDescription', '')
  }
  useEffect(() => {
    props.formik.setFieldValue(
      'seoData.slug',
      slugify(props?.formik?.values?.name).toLowerCase()
    )
  }, [props?.formik?.values?.name]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormWrapper title="SEO" handleClear={handleClear}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputLabel
            id="seoData.metaTitle"
            label="Título"
            placeholder="Infome título do produto"
            name="seoData.metaTitle"
            error={
              props.formik.touched?.seoData?.metaTitle &&
              props.formik.errors?.seoData?.metaTitle
            }
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
            value={props.formik.values?.seoData?.metaTitle}
            className="flex-grow"
          />
          <InputLabel
            id="seoData.slug"
            label="Slug"
            placeholder="Infome slug do produto"
            name="seoData.slug"
            error={
              props.formik.touched?.seoData?.slug &&
              props.formik.errors?.seoData?.slug
            }
            onChange={props.formik.handleChange}
            onBlur={props.formik.handleBlur}
            value={props.formik.values?.seoData?.slug}
            className="flex-grow"
          />
        </div>
        <TextAreaLabel
          id="seoData.metaDescription"
          label="Descrição"
          name="seoData.metaDescription"
          placeholder="Informe a descrição resumida do produto"
          error={
            props.formik.touched?.seoData?.metaDescription &&
            props.formik.errors?.seoData?.metaDescription
          }
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values?.seoData?.metaDescription}
        />
      </div>
    </FormWrapper>
  )
}
