import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import api from '../../../api'

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
} as const
type Role = keyof typeof ROLES
export type UserUser = {
  _id: string
  email: string
  isActive: boolean
  role: 'USER'
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  isActive: boolean
  blocked: boolean
}

export type UserState = {
  users: User[]
  user: null | User
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: User | null
}

const initialState: UserState = {
  users: [],
  user: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  isAdmin: false,
  userData: null
}

//users thunk

export const getUsersThunk = createAsyncThunk('users/get', async () => {
  try {
    const res = await api.get('/api/users')
    console.log('res', res)
    return res.data.users
  } catch (error) {
    console.log(error)
  }
})

export const deleteUserThunk = createAsyncThunk('user/delete', async (userId: string) => {
  try {
    await api.delete(`/api/users/${userId}`)
    return userId
  } catch (error) {
    console.log(error)
  }
})

export const blockUserThunk = createAsyncThunk('user/block', async (userId: string) => {
  try {
    await api.put(`/api/users//block/${userId}`)
    return userId
  } catch (error) {
    console.log(error)
  }
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    loginSucccess: (state, action) => {
      state.user = action.payload
    },
    Adminlogin: (state, action: PayloadAction<User>) => {
      if (state.userData?.role === 'admin') {
        state.isAdmin = true
        state.userData = action.payload
      }
    },

    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },

    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUser = state.users.find((user) => user._id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        state.userData = foundUser
        toast.success('your information is successfully updated', {
          position: 'bottom-left'
        })
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload
      return state
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
  }
})
export const { Adminlogin, login, usersRequest, usersSuccess, updateUser, loginSucccess } =
  usersSlice.actions

export default usersSlice.reducer
