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
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
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
      className={mergeClassName('border', className)}
      {...props}
    />
  )
}
