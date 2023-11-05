import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  sizes: string[]
  categoryId: null | number
  price: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  selectedProduct: Product | null
  search: string
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  selectedProduct: null,
  search: ''
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
    addProduct: (state, action) => {
      state.items = [action.payload.product, ...state.items]
      toast.success('new product is added', {
        position: 'bottom-left'
      })
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
      toast.error('product is removed', {
        position: 'bottom-left'
      })
    },

    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct

      state.items = state.items.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
      toast.success(`${action.payload.editedProduct.name} is updated`, {
        position: 'bottom-left'
      })
    },

    getSearch: (state, action) => {
      state.search = action.payload
    }
  }
})
export const {
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  editProduct,
  getSearch
} = productSlice.actions

export default productSlice.reducer
