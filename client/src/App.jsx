import './App.css'
import { Routes, Route } from 'react-router'
import MainLayout from './components/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ForgotPassEmailScreen from './screens/ForgotPassEmailScreen'
import ForgotPassScreen from './screens/ForgotPassScreen'
import UserInfoByAdmin from './screens/UserInfoByAdmin'
import UserInfo from './screens/UserInfoScreen'
import EditUserScreen from './screens/EditUserScreen'
import PageNotFound from './screens/NotFoundScreen'
import UsersScreen from './screens/UsersScreen'
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/forgot-password' element={<ForgotPassEmailScreen />} />
        <Route path='/reset-password/:token' element={<ForgotPassScreen />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='/user-info' element={<UserInfo />} />
        </Route>
        <Route path='' element={<AdminRoute />}>
          <Route path='/users' element={<UsersScreen />} />
          <Route path='/users/:Id' element={<UserInfoByAdmin />} />
          <Route path='/update-user/:userId' element={<EditUserScreen />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
