/* eslint-disable react/prop-types */
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { mergeClassName } from '../../../../utils/format'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'image', 'video'],
  ['clean'],
]

export default function TextRich({ id, placeholder, className, ...props }) {
  return (
    <ReactQuill
      id={id}
      theme="snow"
      placeholder={placeholder}
      modules={{ toolbar: toolbarOptions }}
      className={mergeClassName('bg-white h-[250px] rounded-sm', className)}
      {...props}
    />
  )
}
