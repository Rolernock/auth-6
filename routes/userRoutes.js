import express from 'express'
import {
  validateRegister,
  validateLogin,
  validateEmail,
  validatePassword
} from '../middleware/formValidator.js'
import {
  registerUser,
  loginUser,
  updateUser,
  allUsers,
  getUserById,
  deleteUser,
  deleteUserById,
  resetPasswordEmail,
  resetPassword,
  logOut
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authValidator.js'
const userRoutes = express.Router()

userRoutes
  .route('/')
  .post(validateRegister, registerUser)
  .get(protect, admin, allUsers)
  .delete(protect, deleteUser)
userRoutes.post('/login', validateLogin, loginUser)
userRoutes.post('/logout', protect, logOut)
userRoutes.post('/forgot-password', validateEmail, resetPasswordEmail)
userRoutes.post('/reset-password/:token', validatePassword, resetPassword)
userRoutes
  .route('/:userId')
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUserById)

export default userRoutes
