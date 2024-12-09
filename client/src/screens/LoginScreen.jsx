import { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser } from '../slices/userSlice'
import FormContainer from '../components/FormContainer'

export default function LoginScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const { email, password } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }
  useEffect(() => {
    user && navigate('/')
  }, [dispatch])
  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await dispatch(loginUser(formData)).unwrap()
      if (data) {
        navigate('/')
        toast.success(`Welcome back ${data.name}`)
      }
    } catch (errors) {
      const msg = errors.map(err => err.msg)
      if (msg[0] === 'Invalid user or password') {
        toast.error(msg[0])
      }
      const errorMessages = errors.reduce((acc, err) => {
        acc[err.path] = err.msg
        return acc
      }, {})
      setErrors(errorMessages)
    }
  }
  return (
    <FormContainer>
      <h1 className='fw-bold text-center'>Sign In</h1>
      <Form className='f-page' onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            onChange={handleChange}
            name='email'
            value={email}
            placeholder='Enter Email'
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            onChange={handleChange}
            name='password'
            value={password}
            autoComplete='password'
            placeholder='Enter Password'
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='dark' type='submit' className='my-2 '>
          Sign In
        </Button>
      </Form>
      <Row className='my-3'>
        <Col>
          <Link className='dark-text' to='/forgot-password'>
            Forgot Password ?
          </Link>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col>
          Do not have an account?{' '}
          <Link className='dark-text' to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
