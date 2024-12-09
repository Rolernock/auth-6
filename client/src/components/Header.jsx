import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  NavDropdown,
  Image
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router'
import { logOut } from '../slices/userSlice'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.users)
  const logOutHandler = async () => {
    await dispatch(logOut())
    navigate('/login')
  }
  const firstName = username => {
    return username.split(' ')[0]
  }

  return (
    <Navbar variant='dark' className='dark-bg' expand='md'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='my-0'>
          <Image src='/logo-white.svg' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navigation' />
        <Navbar.Collapse id='main-navigation'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink}>Home</Nav.Link>
            {user ? (
              <div className='d-flex gap-2'>
                <Nav.Link as={NavLink} to='/user-info'>
                  User Info
                </Nav.Link>
                <NavDropdown title={firstName(user.name)} id='regular-user'>
                  {user?.isAdmin && (
                    <div>
                      <Dropdown.Item as={NavLink} to='/users'>
                        Users
                      </Dropdown.Item>
                    </div>
                  )}
                  <Dropdown.Item onClick={logOutHandler}>
                    Sign Out
                  </Dropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <div className='d-flex gap-2'>
                <Nav.Link as={NavLink} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to='/register'>
                  Register
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
