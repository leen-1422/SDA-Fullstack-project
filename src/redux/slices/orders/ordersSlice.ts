import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { Product } from '../products/productSlice'
import { User } from '../users/usersSlice'

export type OrderItems = {
  _id: string
  product: Product
  quantity: number
}

export type Orders = {
  _id: string
  productId: number
  userId: User
  purchasedAt: string
  orderItems: OrderItems[]
  status: string
  total: number
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

//orders thunk

export const getOrdersThunk = createAsyncThunk('orders/get', async () => {
  try {
    const res = await api.get('/api/orders')
    console.log('res', res)
    return res.data
  } catch (error) {
    console.log(error)
  }
})

export const updateOrderThunk = createAsyncThunk(
  'orders/put',
  async ({ status, id }: { status: string; id: string }) => {
    try {
      const updatedStatues = prompt('enter updated status')
      console.log(id)
      console.log(updatedStatues)

      const res = await api.put(`/api/orders/${id}`, { status: updatedStatues })
      return res.data
    } catch (error) {
      console.log('err', error)
    }
  }
)

export const deleteOrderThunk = createAsyncThunk('orders/delete', async (orderId: string) => {
  try {
    await api.delete(`/api/orders/${orderId}`)
    return orderId
  } catch (error) {
    console.log(error)
  }
})

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload
      return state
    })
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      const orderId = action.payload
      const deleteOrder = state.orders.filter((order) => order._id !== orderId)
      state.orders = deleteOrder
      return state
    })
    builder.addCase(updateOrderThunk.fulfilled, (state, action) => {
      const orderId = action.payload
      const updatedOrder = state.orders.filter((order) => order._id !== orderId)
      state.orders = updatedOrder
      return state
    })
  }
})
export const {} = ordersSlice.actions

export default ordersSlice.reducer
