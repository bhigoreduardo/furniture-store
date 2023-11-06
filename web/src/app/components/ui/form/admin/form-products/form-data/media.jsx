import FileLabel from '../../../../input/file-label'
import InputLabel from '../../../../input/input-label'

export default function Media() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-sm text-gray-900">Imagem de capa</span>
          <div className="flex gap-2">
            <FileLabel
              id="image"
              name="image"
              info="800*800"
              // error={formik.touched.image && formik.errors.image}
              // onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
              // onBlur={formik.handleBlur}
              // value={formik.values.image}
              // onClear={() => formik.setFieldValue('image', '')}
            />
            <FileLabel
              id="image"
              name="image"
              info="800*800"
              // error={formik.touched.image && formik.errors.image}
              // onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
              // onBlur={formik.handleBlur}
              // value={formik.values.image}
              // onClear={() => formik.setFieldValue('image', '')}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <span className="text-sm text-gray-900">Galeria</span>
          <FileLabel
            id="image"
            name="image"
            info="800*800"
            // error={formik.touched.image && formik.errors.image}
            // onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
            // onBlur={formik.handleBlur}
            // value={formik.values.image}
            // onClear={() => formik.setFieldValue('image', '')}
          />
        </div>
      </div>
      <InputLabel
        id="name"
        label="Link do vídeo"
        placeholder="Insira link do vídeo"
        name="name"
        // error={formik.touched.name && formik.errors.name}
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.name}
        className="flex-grow"
      />
    </div>
  )
}
