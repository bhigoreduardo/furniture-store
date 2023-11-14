import { useProducts } from '../../../hooks/use-product'
import CardProduct from '../../components/ui/card/card-product'
import Container from '../../components/ui/container'

export default function Home() {
  const products = useProducts()
  console.log(products)

  return (
    <Container className="flex flex-col gap-16 py-[100px]">
      <div className="grid grid-cols-auto-250 gap-4">
        {products?.map((item) => (
          <CardProduct
            key={item._id}
            id={item._id}
            name={item.name}
            cover={item?.productData?.media?.cover}
            backCover={item?.productData?.media?.backCover}
            rangePrice={item.rangePrice}
          />
        ))}
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          // cover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          // backCover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          // cover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          // backCover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          // cover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          // backCover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          // cover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          // backCover="https://images.tcdn.com.br/img/img_prod/1178996/cadeira_com_braco_imperio_813_1_8c4be413182044fc74a357c81c4bf0cf.png"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
      </div>
    </Container>
  )
}
