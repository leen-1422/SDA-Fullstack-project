import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  image: string 
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type ProductState = {

  items: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false
}

export const productSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },
    editProducts: (state, action: { payload: { productId: number; updatedProduct: Product } }) => {
      const { productId, updatedProduct } = action.payload;
      state.items = state.items.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      );
    },
    
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess, editProducts } = productSlice.actions

export default productSlice.reducer
