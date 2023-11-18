import FooterLink from './footer-link'

export default function PageNav() {
  return (
    <div className="flex flex-col gap-3 w-[200px]">
      <h4 className="font-semibold text-white text-base uppercase">Páginas</h4>
      <div className="flex flex-col gap-2">
        <FooterLink label="Início" to="/" />
        <FooterLink label="Loja" to="/produtos" />
        <FooterLink label="Rastrear" to="/rastrear" />
        <FooterLink label="Compare" to="/compare" />
        <FooterLink label="Contato" to="/contato" />
        <FooterLink label="Sobre" to="/sobre" />
      </div>
    </div>
  )
}
