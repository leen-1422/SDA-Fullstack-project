import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Product } from '../products/productSlice'

export type ProductState = {
  cartItems: Product[]
  cartTotal: number
  cartAmount: number
}

const cartItemsFromStorage = localStorage.getItem('cartItems')
const initialCartItems = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []

const initialState: ProductState = {
  cartItems: initialCartItems,
  cartTotal: 0,
  cartAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1
        toast.success(`${action.payload.name} is added to your cart`, {
          position: 'bottom-left'
        })
      } else {
        const newProduct = { ...action.payload, quantity: 1 }
        state.cartItems.push(newProduct)

        toast.success(`${action.payload.name} is added to your cart`, {
          position: 'bottom-left'
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeProduct: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product._id !== action.payload.productId
      )
      state.cartItems = filteredItems
      toast.error('item is removed from cart', {
        position: 'bottom-left'
      })
      // localStorage.removeItem( 'cartItems')
    },
    decreaseCart: (state, action: { payload: { productId: string } }) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload.productId
      )
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1
        toast.info('you removed one item from cart', {
          position: 'bottom-left'
        })
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const filteredItems = state.cartItems.filter(
          (product) => product._id !== action.payload.productId
        )
        state.cartItems = filteredItems
        toast.error('item is removed from cart', {
          position: 'bottom-left'
        })
      }
    }
  }
})

export const { addToCart, removeProduct, decreaseCart } = cartSlice.actions

export default cartSlice.reducer
