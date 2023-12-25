import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import api from '../../../api'
import { getDecodedTokenFromStorage, getTokenFromStorage } from '../../../utils/token'
import { ROLES } from '../../../Constant'

export type Role = keyof typeof ROLES

export type DecodedUser = {
  _id: string
  email: string
  userId: string
  role: Role
  firstName: string
  lastName: string
  exp: number
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
  isActive: boolean
  isAdmin: boolean
  blocked: boolean
}

export type UserState = {
  users: User[]
  error: string | null | undefined
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: DecodedUser | null
  selectedUser: User | null
}

const isLoggedIn = !!getTokenFromStorage()
const decodedUser = getDecodedTokenFromStorage()
const isAdmin = decodedUser?.role === ROLES.ADMIN
const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn,
  isAdmin,
  userData: decodedUser,
  selectedUser: null
}

//users thunk

export const loginThunk = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/login', credentials)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)
export const registrationThunk = createAsyncThunk(
  'user/registration',
  async (
    credentials: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post('/api/users/register', credentials)
      
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const grantRoleUserThunk = createAsyncThunk(
  'users/role',
  async ({ role, userId }: { role: Role; userId: User['_id'] }, { rejectWithValue }) => {
    try {
      const res = await api.put('/api/users/role', {
        role,
        userId
      })
      return res.data.user
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const getUsersThunk = createAsyncThunk('users/get', async () => {
  try {
    const res = await api.get('/api/users')
    console.log('res', res)
    return res.data.users
  } catch (error) {
    console.log(error)
  }
})

export const deleteUserThunk = createAsyncThunk(
  'user/delete',
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/users/${userId}`)
      return userId
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)
// check here for the extra /
export const blockUserThunk = createAsyncThunk(
  'user/block',
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.put(`/api/users/block/${userId}`)
      return userId
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const updateSingleUserThunk = createAsyncThunk(
  'singleUser/edit',
  async (
    { userId, updatedUser }: { userId: User['_id']; updatedUser: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`/api/users/profile/${userId}`, updatedUser)
      return updatedUser
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const getSingleUserThunk = createAsyncThunk(
  'user/get',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/users/${userId}`)
      console.log(res)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.isAdmin = false
    },
    updateUserFromPayload: (state, action) => {
      const updatedUser = action.payload
      if (updatedUser) {
        const updatedUsers = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
        state.users = updatedUsers
        state.userData = updatedUser
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload
      return state
    })

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const userData = action.payload.decodedUser
      const isAdmin = userData.role === ROLES.ADMIN
      state.userData = userData
      state.isAdmin = isAdmin
      state.isLoggedIn = true
      state.isLoading = false
      return state
    })
    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      const newUser = action.payload
      console.log('this is the created product ', newUser)
      if (newUser) {
        state.users = [newUser, ...state.users]
        console.log(state.users)
        return state
      }
    })

    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      const userId = action.payload
      const deleteUser = state.users.filter((user) => user._id !== userId)
      state.users = deleteUser
      return state
    })
    builder.addCase(blockUserThunk.fulfilled, (state, action) => {
      const userId = action.payload

      state.users = state.users.map((user) =>
        user._id === userId ? { ...user, blocked: !user.blocked } : user
      )
    })
    builder.addCase(grantRoleUserThunk.fulfilled, (state, action) => {
      const userId = action.payload._id
      console.log(userId)
      const updatedUsers = state.users.map((user) => {
        if (user._id === userId) {
          return action.payload
        }
        return user
      })
      state.users = updatedUsers
      return state
    })
    builder.addCase(getSingleUserThunk.fulfilled, (state, action) => {
      state.selectedUser = action.payload
      return state
    })
    builder.addCase(updateSingleUserThunk.fulfilled, (state, action) => {
      const updatedUser = action.payload
      if (updatedUser) {
        const updatedUsers = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
        //@ts-ignore
        state.users = updatedUsers
        //@ts-ignore
        state.userData = updatedUser
      }
    })
  }
})
export const { logout, updateUserFromPayload } = usersSlice.actions

export default usersSlice.reducer
