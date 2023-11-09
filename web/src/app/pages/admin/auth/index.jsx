import Container from '../../../components/ui/container'
import Copyright from '../../../components/ui/copyright'
import FormAuth from '../../../components/ui/form/admin/auth'

export default function Auth() {
  return (
    <main className="flex flex-col h-[100vh]">
      <div className="flex-grow flex items-center w-full bg-[url('/images/auth-bg.png')]">
        <Container className="flex items-center justify-center py-[100px]">
          <FormAuth />
        </Container>
      </div>
      <Copyright />
    </main>
  )
}
