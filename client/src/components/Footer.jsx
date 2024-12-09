import { Row, Col } from 'react-bootstrap'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <Row className='mt-5'>
      <Col className='text-center'>
        <p>Auth-6 &copy; {currentYear}</p>
      </Col>
    </Row>
  )
}
