import crypto from 'crypto'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/UserModel.js'
import { sendEmail } from '../utils/sendEmail.js'
import { generateToken } from '../utils/generateToken.js'

//Helper Functions
const findUserById = async userId => {
  const user = await UserModel.findById(userId).select('-password')
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

const findUserByEmail = async email => {
  const user = await UserModel.findOne({ email }).select('-password')

  if (!user) {
    throw new Error('User not found')
  }
  return user
}

// @route - POST - /api/user
// @desc - Register User
// @access - Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  let user = await UserModel.findOne({ email })
  if (user) {
    throw new Error('User already exists')
  }
  user = await UserModel.create({ name, email, password })
  generateToken(res, user._id)
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt
  })
})

// @route - POST - /api/user/login
// @desc - Login User
// @access - Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id)
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    })
  }
  res.clearCookie('jwt')
  throw new Error('Invalid user or password')
})

// @route - PUT - /api/user/:userId
// @desc - Update user by Id
// @access - Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin, password } = req.body
  const user = await findUserById(req.params.userId)
  if (name) user.name = name
  if (email) user.email = email
  if (isAdmin !== undefined) user.isAdmin = Boolean(isAdmin)
  if (password) user.password = password
  await user.save()
  return res.json({ msg: 'User updated.' })
})

// @route - GET - /api/user
// @desc - Get all users
// @access - Private/Admin
export const allUsers = asyncHandler(async (req, res) => {
  const user = await UserModel.find().select('-password')
  if (!user) {
    throw new Error('No user found.')
  }
  return res.json(user)
})

// @route - GET - /api/user/:userId
// @desc - Get user by id
// @access - Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.userId)
  return res.json(user)
})

// @route - DELETE - /api/user
// @desc - Delete user
// @access - Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req?.user?._id)
  await UserModel.findByIdAndDelete(user._id)
  return res.json({ msg: 'User deleted.' })
})

// @route - DELETE - /api/user/:userId
// @desc - Delete user by Id
// @access - Private/Admin
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await findUserById(req.params.userId)
  await UserModel.findByIdAndDelete(user._id)
  return res.json({ msg: 'User deleted.' })
})

// @route - POST - /api/user/forgot-password
// @desc - reset password email
// @access - Public
export const resetPasswordEmail = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email)
  const token = user.generateToken()
  await user.save()
  const Url = `${process.env.USER_URI}/reset-password/${token}`
  const text = `You requested for a password reset, click the link below to reset your password
  
  
  
  ${Url}`
  sendEmail({
    to: user.email,
    subject: 'Reset Password',
    text
  })
  return res.json({
    msg: 'A password reset email has been sent to your email address'
  })
})

// @route - POST - /api/user/reset-password/:token
// @desc - reset password
// @access - Public
export const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    throw new Error('Expired or Invalid token')
  }
  user.password = req.body.password
  user.resetPasswordExpire = undefined
  user.resetPasswordToken = undefined
  await user.save()
  return res.json({ msg: 'Password Updated' })
})

// @route - POST - /api/user/logout
// @desc - Logout user
// @access - Private
export const logOut = asyncHandler(async (_, res) => {
  res.clearCookie('jwt')
  return res.json({ msg: 'User logged out.' })
})
