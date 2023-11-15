/* eslint-disable no-unsafe-optional-chaining */
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { useProduct } from '../../../../hooks/use-product'
import Container from '../../../components/ui/container'
import Breadcrumb from '../../../components/ui/breadcrumb'
import Tab from '../../../components/ui/button/tab'
import Hero from './hero'
import Overview from './overview'

export default function Product() {
  const { id } = useParams()
  const product = useProduct(id, true)
  const [tabInformation, setTabInformation] = useState('description')
  const getActiveTab = (tab) => tab === tabInformation

  return (
    <section className="flex flex-col gap-10">
      <Breadcrumb />
      <Hero
        id={id}
        gallery={product?.productData?.media?.gallery}
        name={product.name}
        sku={product.sku}
        status={product.status}
        brand={product.brand?.name}
        category={product.category}
        rangePrice={product.rangePrice}
        inventory={product?.productData?.inventory?.info}
      />
      <Container className="flex flex-col">
        <div className="flex items-center justify-center border border-gray-200">
          <Tab
            label="Descrição"
            className="uppercase !px-6"
            active={getActiveTab('description')}
            onClick={() => setTabInformation('description')}
          />
          <Tab
            label="Informações adicionais"
            className="uppercase !px-6"
            active={getActiveTab('additional')}
            onClick={() => setTabInformation('additional')}
          />
          <Tab
            label="Especificações"
            className="uppercase !px-6"
            active={getActiveTab('specification')}
            onClick={() => setTabInformation('specification')}
          />
          <Tab
            label="Avaliações"
            className="uppercase !px-6"
            active={getActiveTab('reviews')}
            onClick={() => setTabInformation('reviews')}
          />
        </div>
        {tabInformation === 'description' && (
          <Overview
            title="Descrição"
            description={product?.description?.overview}
            otherInfos={product?.description?.otherInfos}
          />
        )}
        {tabInformation === 'additional' && (
          <Overview
            title="Detalhes"
            description={product?.additional?.detail}
            otherInfos={product?.additional?.otherInfos}
          />
        )}
        {tabInformation === 'specification' && (
          <Overview
            title={null}
            description={null}
            otherInfos={product?.specification}
          />
        )}
        {tabInformation === 'reviews' && (
          <div className="flex items-center justify-center border border-gray-200 p-10">
            <span className="text-base text-gray-400">Sem avaliações</span>
          </div>
        )}
      </Container>
    </section>
  )
}
