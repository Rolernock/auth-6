import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

export default function PrivateRoute() {
  const { user } = useSelector(state => state.users)
  return user ? <Outlet /> : <Navigate to='/login' />
}
