import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  userById: null,
  users: []
}

export const registerUser = createAsyncThunk(
  '/user/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const loginUser = createAsyncThunk(
  '/user/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/login', formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const updateUser = createAsyncThunk(
  '/user/updateUser',
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/user/${userId}`, formData)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const allUsers = createAsyncThunk(
  '/user/allUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/user')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const getUserById = createAsyncThunk(
  '/user/getUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteUser = createAsyncThunk(
  '/user/deleteUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete('/api/user')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const deleteUserById = createAsyncThunk(
  '/user/deleteUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/user/${userId}`)
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const resetPasswordEmail = createAsyncThunk(
  '/user/resetPasswordEmail',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/forgot-password', { email })
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const resetPassword = createAsyncThunk(
  '/user/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/user/reset-password/${token}`, {
        password
      })
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

export const logOut = createAsyncThunk(
  '/user/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/logout')
      return data
    } catch (err) {
      const errors = err.response.data.errors
      return rejectWithValue(errors)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, state => {
        state.user = null
        localStorage.removeItem('user')
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userById = action.payload
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = null
        state.userById = null
        state.users = []
        localStorage.removeItem('user')
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null
        state.userById = null
        state.users = []
        localStorage.removeItem('user')
      })
  }
})

export default userSlice.reducer
