/* eslint-disable react/prop-types */
import { createMarkup } from '../../../../utils/format'

export default function Overview({ title, description, otherInfos }) {
  return (
    <section className="flex flex-wrap items-start border border-gray-200">
      {title !== null && description !== null && (
        <div className="flex-auto self-stretch w-1/2 flex flex-col gap-2 border-r border-gray-200 p-5 my-5">
          <span className="font-semibold text-sm text-gray-900">{title}</span>
          <p dangerouslySetInnerHTML={createMarkup(description)} />
        </div>
      )}

      {otherInfos?.map((item, i) => (
        <div
          key={i}
          className={`flex-auto self-stretch w-1/2 flex flex-col gap-2 p-5 my-5 ${
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
