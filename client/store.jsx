import { configureStore } from '@reduxjs/toolkit'
import userReducer from './src/slices/userSlice'

const store = configureStore({
  reducer: {
    users: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
