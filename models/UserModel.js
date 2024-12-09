import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  } else {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  }
})

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = function () {
  const token = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return token
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel
