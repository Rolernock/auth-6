import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router'

export default function AdminRoute() {
  const { user } = useSelector(state => state.users)
  return user?.isAdmin ? <Outlet /> : <Navigate to='/login' />
}
