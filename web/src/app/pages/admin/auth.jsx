import Container from '../../components/ui/container'

import FormAuth from '../../components/ui/form/admin/form-auth'

export default function Auth() {
  return (
    <main className="flex items-center h-[100vh] w-full bg-[url('/images/auth-bg.png')]">
      <Container className="flex items-center justify-center py-[100px]">
        <FormAuth />
      </Container>
    </main>
  )
}
