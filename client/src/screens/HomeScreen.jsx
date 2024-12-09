import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Container, Button, Card } from 'react-bootstrap'

export default function HomeScreen() {
  const { user } = useSelector(state => state.users)

  return (
    <Container className='mt-5 text-center f-page'>
      <h1>Welcome to AuthSite</h1>
      <p className='lead'>
        {user
          ? `Hello, ${user.name}! Explore the features of authentication and authorization.`
          : 'Please login or register to access your account.'}
      </p>

      {user ? (
        <Card className='mt-4 mx-auto' style={{ maxWidth: '400px' }}>
          <Card.Body>
            <h5>Account Details</h5>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.isAdmin && (
              <p>
                <strong>Role:</strong> Admin
              </p>
            )}
            <Link to='/user-info'>
              <Button variant='primary' className='mt-3'>
                View Profile
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <div className='d-flex justify-content-center gap-3 mt-4'>
          <Link to='/login'>
            <Button variant='primary'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button variant='secondary'>Register</Button>
          </Link>
        </div>
      )}
    </Container>
  )
}
