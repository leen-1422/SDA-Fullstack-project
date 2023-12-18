import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import api from '../../../api'
import { getDecodedTokenFromStorage, getTokenFromStorage } from '../../../utils/token'
import { ROLES } from '../../../Constant'


export type Role = keyof typeof ROLES

export type UserUser = {
  _id: string
  email: string
  userId: string
  isActive: boolean
  role: 'USER'
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
export type DecodedUser = {
  email: string
  userId: string
  role: Role
}

export type UserState = {
  users: User[]
  // user: null | User
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  userData: DecodedUser | null
}
const isLoggedIn = !!getTokenFromStorage()
const decodedUser = getDecodedTokenFromStorage()
const isAdmin = decodedUser?.role === ROLES.ADMIN
const initialState: UserState = {
  users: [],
  // user: null,
  error: null,
  isLoading: false,
  isLoggedIn,
  isAdmin,
  userData: decodedUser
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

export const grantRoleUserThunk = createAsyncThunk(
  'users/role',
  async ({ role, userId }: { role: Role; userId: User['_id'] }) => {
    try {
      const res = await api.put('api/users/role', {
        role,
        userId
      })
      return res.data.user
    } catch (error) {
      console.log(':eyes: ', error)
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
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.isAdmin = false
    },
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
    }

    // loginSucccess: (state, action) => {
    //   state.user = action.payload
    // },

    // Adminlogin: (state, action: PayloadAction<User>) => {
    //   if (state.userData?.role === ) {
    //     state.isAdmin = true
    //     state.userData = action.payload
    //   }
    // },

    // usersRequest: (state) => {
    //   state.isLoading = true
    // },
    // usersSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.users = action.payload
    // },

    // getError: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload
    // },

    // updateUser: (state, action) => {
    //   const { id, firstName, lastName } = action.payload
    //   const foundUser = state.users.find((user) => user._id === id)
    //   if (foundUser) {
    //     foundUser.firstName = firstName
    //     foundUser.lastName = lastName
    //     state.userData = foundUser
    //     toast.success('your information is successfully updated', {
    //       position: 'bottom-left'
    //     })
    //     localStorage.setItem(
    //       'loginData',
    //       JSON.stringify({
    //         isLoggedIn: state.isLoggedIn,
    //         userData: state.userData
    //       })
    //     )
    //   }
    // }
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
      const updatedUsers = state.users.map((user) => {
        if (user._id === userId) {
          return action.payload
        }
        return user
      })
      state.users = updatedUsers
      return state
    })
  }
})
export const { login, logout } = usersSlice.actions

export default usersSlice.reducer
