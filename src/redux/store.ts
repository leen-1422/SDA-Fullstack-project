import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cart/cartSlice'
import categoriesReducer from './slices/categories/categoriesSlice'
import ordersReducer from './slices/orders/ordersSlice'
import productsReducer from './slices/products/productSlice'
import usersReducer from './slices/users/usersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    orders: ordersReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
