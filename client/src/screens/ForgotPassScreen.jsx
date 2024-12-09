import { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { resetPassword } from '../slices/userSlice'
import FormContainer from '../components/FormContainer'

export default function ForgotPassScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await dispatch(resetPassword({ token, password })).unwrap()
      if (data.msg) {
        toast.success(data.msg)
        navigate('/')
      }
    } catch (errors) {
      const msg = errors.map(err => err.msg)
      console.log(msg)
      if (msg[0] === 'Expired or Invalid token') {
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
      <h1 className='fw-bold text-center'>Reset Password</h1>
      <Form className='f-page' onSubmit={handleSubmit}>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='password'
            onChange={evt => setPassword(evt.target.value)}
            name='password'
            value={password}
            placeholder='Enter Password'
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='dark' type='submit' className='my-2 '>
          Send
        </Button>
      </Form>
    </FormContainer>
  )
}
