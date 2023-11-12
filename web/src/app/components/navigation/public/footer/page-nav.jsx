import FooterLink from './footer-link'

export default function PageNav() {
  return (
    <div className="flex flex-col gap-3 w-[200px]">
      <h4 className="font-semibold text-white text-base uppercase">Páginas</h4>
      <div className="flex flex-col gap-2">
        <FooterLink label="Início" />
        <FooterLink label="Loja" />
        <FooterLink label="Rastrear" />
        <FooterLink label="Compare" />
        <FooterLink label="Contato" />
        <FooterLink label="Sobre" />
      </div>
    </div>
  )
}
