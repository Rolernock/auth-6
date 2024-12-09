import path from 'path'
import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import { ConnectDB } from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()

//Parse incoming requests with json
app.use(express.json())

//Parse incoming cookies
app.use(cookieParser())

//Routes
app.use('/api/user', userRoutes)

//Resolve __dirname in Es_module
const __dirname = path.resolve()

//User client app
app.use(express.static(path.join(__dirname, '/client/dist')))

//Render client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

//Handle Errors
app.use(notFound)
app.use(errorHandler)

//Connect to database
ConnectDB()
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
