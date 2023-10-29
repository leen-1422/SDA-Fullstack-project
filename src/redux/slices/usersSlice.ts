import { createSlice } from '@reduxjs/toolkit'



export type Users = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string,
  role: string

}

export type InitialState = {

  users: Users[]
  error: null | string
  isLoading: boolean
}

const initialState: InitialState = {
  users: [],
  error: null,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },

    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredItems = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredItems
    }
  }
})
export const { removeUser, usersRequest, usersSuccess } = userSlice.actions

export default userSlice.reducer
