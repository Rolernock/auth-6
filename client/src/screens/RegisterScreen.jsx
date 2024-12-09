import { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../slices/userSlice'
import FormContainer from '../components/FormContainer'

export default function RegisterScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const { name, email, password, confirmPassword } = formData
  const handleChange = evt => {
    const { name, value } = evt.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }
  useEffect(() => {
    user && navigate('/')
  }, [dispatch])
  const handleSubmit = async evt => {
    evt.preventDefault()
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match.')
    }
    try {
      const data = await dispatch(registerUser(formData)).unwrap()
      if (data) {
        navigate('/')
        toast.success('Account created successfully.')
      }
    } catch (errors) {
      const err = errors.map(err => err.msg)
      if (err[0] === 'User already exists') {
        toast.error(err[0])
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
      <h1 className='fw-bold text-center'>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            onChange={handleChange}
            name='name'
            value={name}
            placeholder='Enter Name'
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
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
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            onChange={handleChange}
            name='confirmPassword'
            value={confirmPassword}
            autoComplete='confirmPassword'
            placeholder='Confirm Password'
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='dark' type='submit' className='my-2 '>
          Sign Up
        </Button>
      </Form>
      <Col>
        Have an Account?{' '}
        <Link className='dark-text' to='/login'>
          Login
        </Link>
      </Col>
    </FormContainer>
  )
}
