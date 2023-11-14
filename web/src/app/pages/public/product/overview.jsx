/* eslint-disable react/prop-types */
import { createMarkup } from '../../../../utils/format'

export default function Overview({ title, description, otherInfos }) {
  return (
    <section className="flex items-start gap-10 border border-gray-200 p-10">
      {title !== null && description !== null && (
        <div className="flex flex-col gap-2 w-[50%] border-r border-gray-200">
          <span className="font-semibold text-sm text-gray-900">{title}</span>
          <p dangerouslySetInnerHTML={createMarkup(description)} />
        </div>
      )}

      {otherInfos?.map((item, i) => (
        <div
          key={i}
          className={`flex-grow flex flex-col gap-2 ${
            i !== otherInfos?.length - 1 && 'border-r border-gray-200'
          }`}
        >
          <span className="font-semibold text-sm text-gray-900">
            {item.title}
          </span>
          <p dangerouslySetInnerHTML={createMarkup(item.description)} />
        </div>
      ))}
    </section>
  )
}
