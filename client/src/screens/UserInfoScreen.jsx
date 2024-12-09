import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { deleteUser } from '../slices/userSlice'
import DeleteUserModal from '../components/DeleteUserModal'
import { Container, Card, Button } from 'react-bootstrap'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

export default function UserInfo() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState(null)
  const handleShow = userId => {
    setShowModal(true)
    setUserId(userId)
  }
  const handleClose = () => {
    setUserId(null)
    setShowModal(false)
  }
  const handleDelete = async () => {
    try {
      const data = await dispatch(deleteUser(userId)).unwrap()
      navigate('/')
      setShowModal(false)
      toast.success(data.msg)
    } catch (error) {
      error.map(err => toast.error(err.msg))
    }
  }

  return (
    <Container className='mt-5 f-page'>
      {user && (
        <Card className='mx-auto' style={{ maxWidth: '500px' }}>
          <Card.Header className='text-center fw-bold'>
            User Information
          </Card.Header>
          <Card.Body>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Joined:</strong>{' '}
              {format(new Date(user.createdAt), 'MMMM yy, hh:mm a')}
            </p>
            <div className='d-flex justify-content-center mt-5'>
              <Button onClick={() => handleShow(user._id)} variant='danger'>
                Delete Account
              </Button>
            </div>
          </Card.Body>
          <DeleteUserModal
            show={showModal}
            handleClose={handleClose}
            handleConfirm={handleDelete}
          />
        </Card>
      )}
    </Container>
  )
}
