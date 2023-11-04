import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categories, { categoriesSlice } from './slices/categories/categoriesSlice'
import categoriesReducer from './slices/categories/categoriesSlice'
import usersReducer from './slices/users/usersSlice'
import ordersReducer from './slices/orders/ordersSlice'
import cartReducer from './slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    orders: ordersReducer,
    cart:cartReducer


    
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
