import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categories, { categoriesSlice } from './slices/categoriesSlice'
import categoriesReducer from './slices/categoriesSlice'
import usersReducer from './slices/usersSlice'
import ordersReducer from './slices/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    orders: ordersReducer


    
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
