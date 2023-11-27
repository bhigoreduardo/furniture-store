import { useFormik } from 'formik'
import { toast } from 'react-toastify'

import { patch } from '../../../../libs/fetcher'
import { useFilterHistory } from '../../../../hooks/use-product'
import { optionsFullLocaleDate } from '../../../../utils/format'
import useUser from '../../../../hooks/use-user'
import useApp from '../../../../hooks/use-app'
import Button from '../../../components/ui/button/button'
import CardProduct from '../../../components/ui/card/card-product'
import FilterHistory from '../../../components/ui/filter/filter-history'
import Heading from '../../../components/ui/heading'
import CheckboxToggleLabel from '../../../components/ui/input/checkboxtoggle-label'

export default function History() {
  const { user, handleUpdateUser } = useUser()
  const { setIsLoading } = useApp()
  const history = useFilterHistory()
  const keys = history ? Object.keys(history) : []
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { historyAvailable: user?.historyAvailable },
    onSubmit: async (values) => {
      const { user, token } = await patch(
        '/customers/toggle-history',
        values,
        setIsLoading,
        toast
      )
      handleUpdateUser(user, token)
    },
  })

  return (
    <section className="flex-grow flex flex-col gap-6">
      <Heading
        title="Histórico de navegação"
        btn={
          <CheckboxToggleLabel
            id="historyAvailable"
            name="historyAvailable"
            label="Ativar/desativar histórico de navegação"
            onChange={() => {
              formik.setFieldValue(
                'historyAvailable',
                !formik.values.historyAvailable
              )
              formik.handleSubmit()
            }}
            checked={formik.values.historyAvailable}
          />
        }
        className="!border-none !px-0"
      />
      <FilterHistory />
      {keys?.length > 0 ? (
        <>
          {Object.keys(history)?.map((key) => (
            <div
              key={key}
              className="flex flex-col gap-6 border border-100 rounded-sm shadow-md py-2"
            >
              <Heading
                title={`${new Date(key).toLocaleDateString(
                  'pt-BR',
                  optionsFullLocaleDate(false)
                )}`}
              />
              <div className="grid grid-cols-auto-250 gap-4 px-6">
                {history[key].map((item) => (
                  <CardProduct
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    cover={item?.productData?.media?.cover}
                    backCover={item?.productData?.media?.backCover}
                    rangePrice={item.rangePrice}
                    reviewsAvg={item.reviewsAvg}
                    reviews={item.reviews}
                  />
                ))}
              </div>
            </div>
          ))}
          <Button
            label="Carregar mais"
            // onClick={}
            className="text-orange-500 !border-orange-200 hover:bg-orange-600 hover:text-white w-fit mx-auto"
          />
        </>
      ) : (
        <span className="text-sm text-gray-600 text-left">Sem resultados</span>
      )}
    </section>
  )
}
