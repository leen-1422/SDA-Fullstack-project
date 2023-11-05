import { createSlice } from '@reduxjs/toolkit'

export type Orders = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type InitialState = {
  orders: Orders[]
  error: null | string
  isLoading: boolean
}

const initialState: InitialState = {
  orders: [],
  error: null,
  isLoading: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    }
  }
})
export const { ordersRequest, ordersSuccess } = ordersSlice.actions

export default ordersSlice.reducer
