import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { STATUS } from '../../../Constant'
import api from '../../../api'
import { Product } from '../products/productSlice'
import { User } from '../users/usersSlice'

export type Status = keyof typeof STATUS

export type OrderItems = {
  _id: string
  product: Product
  quantity: number
}

export type Orders = {
  _id: string
  productId: string
  userId: User
  purchasedAt: string
  orderItems: OrderItems[]
  status: Status
  total: number
  shippingAddress: string
  city: string
  zipCode: string
  country: string
  phone: string
}

export type InitialState = {
  orders: Orders[]
  error: null | string
  isLoading: boolean
  selectedOrder: Orders | null
}

const initialState: InitialState = {
  orders: [],
  error: null,
  isLoading: false,
  selectedOrder: null
}

//orders thunk

export const getOrdersThunk = createAsyncThunk('orders/get', async () => {
  try {
    const res = await api.get('/api/orders')
    return res.data
  } catch (error) {
    console.log(error)
  }
})
export const getSingleOrderThunk = createAsyncThunk(
  'order/get',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/orders/${orderId}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const editOrderStatusThunk = createAsyncThunk(
  'orderStatuts/edit',
  async ({ status, orderId }: { status: Status; orderId: Orders['_id'] }, { rejectWithValue }) => {
    try {
      const res = await api.put(`api/orders/${orderId}`, {
        status,
        orderId
      })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const deleteOrderThunk = createAsyncThunk(
  'orders/delete',
  async (orderId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/orders/${orderId}`)
      return orderId
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders = action.payload
      return state
    })
    builder.addCase(getSingleOrderThunk.fulfilled, (state, action) => {
      state.selectedOrder = action.payload
      return state
    })
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      const orderId = action.payload
      const deleteOrder = state.orders.filter((order) => order._id !== orderId)
      state.orders = deleteOrder
      return state
    })
    builder.addCase(editOrderStatusThunk.fulfilled, (state, action) => {
      const orderId = action.payload._id
      const updatedOrder = state.orders.map((order) => {
        if (order._id === orderId) {
          return action.payload.updatedOrder
        }
        return order
      })
      state.orders = updatedOrder
      return state
    })
  }
})
export const {} = ordersSlice.actions

export default ordersSlice.reducer
