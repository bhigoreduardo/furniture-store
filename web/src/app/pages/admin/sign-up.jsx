import Container from '../../components/ui/container'
import FormSignUp from '../../components/ui/form/admin/form-sign-up'

export default function SignUp() {
  return (
    <main className="flex items-center h-[100vh] w-full bg-[url('/images/auth-bg.png')]">
      <Container className="flex items-center justify-center py-[100px]">
        <FormSignUp />
      </Container>
    </main>
  )
}
