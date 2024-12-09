import { check, validationResult } from 'express-validator'

const errorValidator = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

export const validateRegister = [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be atleast 6 characters long').isLength({
    min: 6
  }),
  errorValidator
]

export const validateLogin = [
  check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'Password must be atleast 6 characters long').isLength({
    min: 6
  }),
  errorValidator
]

export const validateEmail = [
  check('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  errorValidator
]

export const validatePassword = [
  check('password', 'Password must be atleast 6 characters long').isLength({
    min: 6
  }),
  errorValidator
]
