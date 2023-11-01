import Container from '../../../components/ui/container'
import Copyright from '../../../components/ui/copyright'
import FormGenerateRecoveryPassword from '../../../components/ui/form/admin/auth/form-generate-recovery-password'

export default function GenerateRecoveryPassword() {
  return (
    <main className="flex flex-col h-[100vh]">
      <div className="flex-grow flex items-center w-full bg-[url('/images/auth-bg.png')]">
        <Container className="flex items-center justify-center py-[100px]">
          <FormGenerateRecoveryPassword />
        </Container>
      </div>
      <Copyright />
    </main>
  )
}
