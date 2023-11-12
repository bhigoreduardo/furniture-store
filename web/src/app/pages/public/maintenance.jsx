import Container from '../../components/ui/container'
import Copyright from '../../components/ui/copyright'

export default function Maintenance() {
  return (
    <main className="flex flex-col h-[100vh]">
      <Container className="flex flex-grow items-center justify-center">
        <div className="flex flex-col gap-10">
          <img src="/images/maintenance.svg" alt="Manutenção" />
          <div className="flex flex-col items-center gap-4">
            <h4 className="font-semibold text-4xl-text-gray-900">
              Loja em manutenção
            </h4>
            <span className="text-base text-gray-600">
              Em breve retornaremos
            </span>
          </div>
        </div>
      </Container>
      <Copyright />
    </main>
  )
}
