import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { resetPasswordEmail } from '../slices/userSlice'
import FormContainer from '../components/FormContainer'

export default function ForgotPassEmailScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await dispatch(resetPasswordEmail(email)).unwrap()
      if (data.msg) {
        toast.success(data.msg)
        navigate('/')
      }
    } catch (errors) {
      const msg = errors.map(err => err.msg)
      if (msg[0] === 'User not found') {
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
      <h1 className='fw-bold text-center'>Forgot Password</h1>
      <Form className='f-page' onSubmit={handleSubmit}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            onChange={evt => setEmail(evt.target.value)}
            name='email'
            value={email}
            placeholder='Enter Email'
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='dark' type='submit' className='my-2 '>
          Send
        </Button>
      </Form>
    </FormContainer>
  )
}
