import mongoose from 'mongoose'

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_COMPASS)
    console.log(`DB Connected On: ${conn.connection.host}`)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}
