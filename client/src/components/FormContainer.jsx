import { Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router'

export default function FormContainer({ children }) {
  return (
    <Row className='justify-content-center'>
      <Col xs={12} md={5}>
        {children}
      </Col>
    </Row>
  )
}
