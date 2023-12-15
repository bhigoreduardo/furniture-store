/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { XCircle } from 'phosphor-react'

import ImageLabel from '../../../../input/image-label'
import InputLabel from '../../../../input/input-label'

export default function Media(props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-900">Imagem de capa</span>
          <div className="flex gap-2">
            <ImageLabel
              id="cover"
              name="cover"
              info="800*800"
              error={props.formik.touched?.cover && props.formik.errors?.cover}
              onChange={(e) =>
                props.formik.setFieldValue('cover', e.target.files[0])
              }
              onBlur={props.formik.handleBlur}
              value={props.formik.values?.cover}
              onClear={() => props.formik.setFieldValue('cover', '')}
            />
            <ImageLabel
              id="backCover"
              name="backCover"
              info="800*800"
              error={
                props.formik.touched?.backCover &&
                props.formik.errors?.backCover
              }
              onChange={(e) =>
                props.formik.setFieldValue('backCover', e.target.files[0])
              }
              onBlur={props.formik.handleBlur}
              value={props.formik.values?.backCover}
              onClear={() => props.formik.setFieldValue('backCover', '')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-900">Galeria</span>
          <div className="flex items-start gap-2">
            <ImageLabel
              id="gallery"
              name="gallery"
              info="1200*960"
              error={
                props.formik.touched?.gallery && props.formik.errors?.gallery
              }
              onChange={(e) => {
                const files = e.target.files[0]
                typeof files !== 'undefined' &&
                  props.formik.setFieldValue('gallery', [
                    ...props.formik.values?.gallery,
                    files,
                  ])
              }}
              onBlur={props.formik.handleBlur}
            />

            <div className="flex flex-wrap gap-2">
              {props.formik.values?.gallery?.map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col justify-center items-center w-[100px] h-[100px] border border-dashed border-gray-400 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-sm"
                >
                  <button
                    type="button"
                    onClick={() =>
                      props.formik.setFieldValue(
                        'gallery',
                        props.formik.values?.gallery?.filter(
                          (_, key) => key !== i
                        )
                      )
                    }
                    className="absolute z-10 -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full"
                  >
                    <XCircle size={20} />
                  </button>
                  <div className="flex items-center justify-center w-full h-full overflow-hidden">
                    <img
                      src={
                        typeof item === 'string'
                          ? `${
                              import.meta.env.VITE_SERVER_PUBLIC_IMAGES
                            }/${item}`
                          : window.URL.createObjectURL(item)
                      }
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <InputLabel
        id="video"
        label="Link do vídeo"
        placeholder="Insira link do vídeo"
        name="video"
        error={props.formik.touched?.video && props.formik.errors?.video}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        value={props.formik.values?.video}
        className="flex-grow"
      />
    </div>
  )
}
