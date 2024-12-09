import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/UserModel.js'

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await UserModel.findById(decoded.userId)
    } catch (err) {
      throw new Error('Invalid or Expired token')
    }
    next()
  } else {
    throw new Error('No token, access denied')
  }
})

export const admin = (req, res, next) => {
  if (req?.user?.isAdmin) {
    next()
  } else {
    throw new Error('Access denied, only admins allowed.')
  }
}
