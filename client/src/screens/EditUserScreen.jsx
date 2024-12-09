import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { updateUser, getUserById } from '../slices/userSlice'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Spinner from '../components/Spinner'

export default function EditUserScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId } = useParams()
  const { userById } = useSelector(state => state.users)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: '',
    password: ''
  })
  const { name, email, isAdmin, password } = formData

  const handleChange = evt => {
    const { name, value, type, checked } = evt.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    if (!password) {
      delete formData.password
    }
    const data = await dispatch(updateUser({ formData, userId })).unwrap()
    toast.success(data.msg)
    navigate('/')
  }
  useEffect(() => {
    dispatch(getUserById(userId))
  }, [userId])

  useEffect(() => {
    if (userById) {
      setFormData({
        name: userById.name || '',
        email: userById.email || '',
        password: '',
        isAdmin: userById.isAdmin || false
      })
    }
  }, [userById])
  return (
    <>
      {!userById ? (
        <Spinner />
      ) : (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name' className='my-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                onChange={handleChange}
                name='name'
                value={name}
              />
            </Form.Group>
            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                onChange={handleChange}
                name='email'
                value={email}
              />
            </Form.Group>
            <Form.Group controlId='isAdmin' className='my-3'>
              <Form.Label>Is Admin</Form.Label>
              <Form.Check
                type='checkbox'
                name='isAdmin'
                label='isAdmin'
                checked={isAdmin}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                onChange={handleChange}
                name='password'
                value={password}
                autoComplete='password'
              />
            </Form.Group>
            <Button variant='dark' type='submit' className='my-2 '>
              Update User
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}
