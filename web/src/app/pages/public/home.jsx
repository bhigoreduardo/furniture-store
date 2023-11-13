import CardProduct from '../../components/ui/card/card-product'
import Container from '../../components/ui/container'

export default function Home() {
  return (
    <Container className="flex flex-col gap-16 py-[100px]">
      <div className="grid grid-cols-auto-250 gap-4">
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
        <CardProduct
          badge="Quente"
          badgeColor="red"
          reviews={{ avg: 4.7, amount: 6767 }}
          name="Cadeira Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 442.12, max: 442.12 }}
        />
        <CardProduct
          badge="32% Off"
          badgeColor="yellow"
          reviews={{ avg: 2.9, amount: 767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 872.12 }}
        />
        <CardProduct
          badge="Mais vendidos"
          badgeColor="blue"
          reviews={{ avg: 4.9, amount: 3767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
        <CardProduct
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
        <CardProduct
          reviews={{ avg: 4.9, amount: 3767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
      </div>
      <div className="grid grid-cols-auto-250 gap-4">
        <CardProduct
          badge="Oferta"
          badgeColor="green"
          reviews={{ avg: 3.7, amount: 56767 }}
          name="DELL 21.5 inch Full HD Monitor (E2216HV)"
          rangePrice={{ min: 442.12, max: 865.99 }}
        />
        <CardProduct
          badge="Quente"
          badgeColor="red"
          reviews={{ avg: 4.7, amount: 6767 }}
          name="Cadeira Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 442.12, max: 442.12 }}
        />
        <CardProduct
          badge="32% Off"
          badgeColor="yellow"
          reviews={{ avg: 2.9, amount: 767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 872.12 }}
        />
        <CardProduct
          badge="Mais vendidos"
          badgeColor="blue"
          reviews={{ avg: 4.9, amount: 3767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
        <CardProduct
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
        <CardProduct
          reviews={{ avg: 4.9, amount: 3767 }}
          name="Amazon Basics High-Speed HDMI Cable Bose Golden Verde com Madeiras - Premium Classe I"
          rangePrice={{ min: 542.12, max: 542.12 }}
        />
      </div>
    </Container>
  )
}
