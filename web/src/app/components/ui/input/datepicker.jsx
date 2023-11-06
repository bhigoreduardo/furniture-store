import { useState } from 'react'
import { Calendar } from 'phosphor-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { mergeClassName } from '../../../../utils/format'

export default function DatePickerUI(
  id,
  name,
  className,
  handleChange,
  ...props
) {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  return (
    <div
      className={mergeClassName(
        'flex items-center justify-between gap-1 py-2 px-4 bg-white border border-gray-300 rounded-sm text-gray-700 text-sm',
        className
      )}
    >
      <DatePicker
        id={id}
        name={name}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update)
          handleChange(update)
        }}
        dateFormat="dd/MM/yy"
        isClearable={true}
        monthsShown={2}
        withPortal
        // openToDate={new Date("1993/09/28")}
        placeholderText="Selecione a data"
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <span
              aria-label="Previous Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--previous'
              }
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
              onClick={decreaseMonth}
            >
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                }
              >
                {'<'}
              </span>
            </span>
            <span className="font-normal text-base text-gray-900 react-datepicker__current-month">
              {monthDate.toLocaleString('pt-BR', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span
              aria-label="Next Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--next'
              }
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
              onClick={increaseMonth}
            >
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                }
              >
                {'>'}
              </span>
            </span>
          </div>
        )}
        {...props}
      />
      <Calendar className="text-gray-400" />
    </div>
  )
}
