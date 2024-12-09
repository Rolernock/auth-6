import { Outlet } from 'react-router'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Container className='mt-3'>
        <Outlet />
        <Footer />
      </Container>
    </>
  )
}
