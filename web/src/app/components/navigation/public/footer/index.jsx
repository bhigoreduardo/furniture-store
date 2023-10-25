import Container from '../../../ui/container'
import CategoryNav from './category-nav'
import ContactNav from './contact-nav'
import PageNav from './page-nav'
import SocialNav from './social-nav'

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <Container className="flex justify-between py-16">
        <ContactNav />
        <CategoryNav />
        <PageNav />
        <SocialNav />
      </Container>
    </footer>
  )
}
