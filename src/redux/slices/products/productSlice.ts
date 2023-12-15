import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { Category } from '../categories/categoriesSlice'
import api from '../../../api'
import { useState } from 'react'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  category: Category[]
  sizes: string[]
  categoryId: null | string
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

//products thunk

export const getProductsThunk = createAsyncThunk('products/get', async () => {
  try {
    const res = await api.get('/api/products')
    console.log(res)
    return res.data.result
  } catch (error) {
    console.log(error)
  }
})

export const deleteProductsThunk = createAsyncThunk(
  'products/delete',
  async (productId: string) => {
    try {
      await api.delete(`/api/products/${productId}`)
      return productId
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateProductsThunk = createAsyncThunk('products/put', async (productId: string) => {
  try {
    await api.put(`/api/products/${productId}`)
    return productId
  } catch (error) {
    console.log(error)
  }
})

export const addProductsThunk = createAsyncThunk(
  'products/add',
  async (product: {
    name: string
    image: string
    description: string
    category: Category[]
    sizes: string[]
    price: number
  }) => {
    try {
      const res = await api.post('/api/products', product)
      console.log('res', res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.items = action.payload
    },
    singleProductsSuccess: (state, action) => {
      state.isLoading = false
      state.selectedProduct = action.payload
    },
    addProduct: (state, action) => {
      state.items = [action.payload.product, ...state.items]
      toast.success('new product is added', {
        position: 'bottom-left'
      })
    },
    removeProduct: (state, action: { payload: { productId: string } }) => {
      const filteredItems = state.items.filter(
        (product) => product._id !== action.payload.productId
      )
      state.items = filteredItems
      toast.error('product is removed', {
        position: 'bottom-left'
      })
    },

    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct

      state.items = state.items.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      )
      toast.success(`${action.payload.editedProduct.name} is updated`, {
        position: 'bottom-left'
      })
    },

    getSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload
      return state
    })
    builder.addCase(deleteProductsThunk.fulfilled, (state, action) => {
      const productId = action.payload
      const deleteProduct = state.items.filter((product) => product._id !== productId)
      state.items = deleteProduct
      return state
    })
    builder.addCase(addProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload
    })
  }
})
export const {
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  editProduct,
  getSearch,
  singleProductsSuccess
} = productSlice.actions

export default productSlice.reducer
