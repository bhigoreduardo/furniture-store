import Container from '../../../ui/container'
import IconSocial from '../../../ui/icon/icon-social'

export default function TopNav() {
  return (
    <div className="bg-blue-900 text-white border-b border-gray-600">
      <Container className="flex items-center justify-between py-3">
        <span className="text-sm">
          Bem-vindo a Furniture eCommerce de móveis.
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm">Siga nos:</span>
          <IconSocial />
        </div>
      </Container>
    </div>
  )
}
