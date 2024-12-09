import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Container } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router'
import { allUsers } from '../slices/userSlice'
import Spinner from '../components/Spinner'
import { format } from 'date-fns'

export default function UsersScreen() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(allUsers())
  }, [dispatch])
  return (
    <Container className='mt-5'>
      <h1 className='text-center fw-bold'>Users</h1>
      {!users.length ? (
        <Spinner />
      ) : (
        <Table striped bordered hover responsive className='mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{format(new Date(user.createdAt), 'MMMM yy, hh:mm a')}</td>
                <td>
                  <Button
                    variant='primary'
                    as={Link}
                    to={`/users/${user._id}`}
                    className='mx-1'
                    size='sm'
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/update-user/${user._id}`}
                    variant='danger'
                    size='sm'
                  >
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}
