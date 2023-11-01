import Container from '../../../components/ui/container'
import Copyright from '../../../components/ui/copyright'
import FormSignUp from '../../../components/ui/form/admin/auth/form-sign-up'

export default function SignUp() {
  return (
    <main className="flex flex-col h-[100vh]">
      <div className="flex-grow flex items-center w-full bg-[url('/images/auth-bg.png')]">
        <Container className="flex items-center justify-center py-[100px]">
          <FormSignUp />
        </Container>
      </div>
      <Copyright />
    </main>
  )
}
