import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { deleteUserById, getUserById } from '../slices/userSlice'
import DeleteUserModal from '../components/DeleteUserModal'
import { Container, Card, Button } from 'react-bootstrap'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function UserInfoByAdmin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { Id } = useParams()
  const { userById } = useSelector(state => state.users)
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
      const data = await dispatch(deleteUserById(userId)).unwrap()
      navigate('/users')
      setShowModal(false)
      toast.success(data.msg)
    } catch (error) {
      error.map(err => toast.error(err.msg))
    }
  }
  useEffect(() => {
    dispatch(getUserById(Id))
  }, [dispatch])

  return (
    <Container className='mt-5 f-page'>
      {!userById ? (
        <Spinner />
      ) : (
        <Card className='mx-auto' style={{ maxWidth: '500px' }}>
          <Card.Header className='text-center fw-bold'>
            User Information
          </Card.Header>
          <Card.Body>
            <p>
              <strong>Name:</strong> {userById.name}
            </p>
            <p>
              <strong>Email:</strong> {userById.email}
            </p>
            <p>
              <strong>Admin Status:</strong> {userById.isAdmin ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Joined:</strong>{' '}
              {format(new Date(userById.createdAt), 'MMMM yy, hh:mm a')}
            </p>
            <div className='d-flex justify-content-center mt-5'>
              <Button onClick={() => handleShow(userById._id)} variant='danger'>
                Delete This Account
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
