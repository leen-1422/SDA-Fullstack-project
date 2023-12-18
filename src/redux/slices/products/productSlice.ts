import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { Category } from '../categories/categoriesSlice'

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

export const getSingleProductThunk = createAsyncThunk('product/get', async (productId: string) => {
  try {
    const res = await api.get(`/api/products/${productId}`)
    console.log(res)
    return res.data
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

export const editProductThunk = createAsyncThunk(
  'products/edit',
  async ({ productId, updatedProduct }: { productId: string; updatedProduct: any }) => {
    try {
      await api.put(`/api/products/${productId}`, updatedProduct)
      console.log('from inside thunk', productId)
      return updatedProduct
    } catch (error) {
      console.log('👀 ', error)
    }
  }
)

// export const addProductsThunk = createAsyncThunk(
//   'products/add',
//   async (product: {
//     name: string
//     image: string
//     description: string
//     category: Category[]
//     sizes: string[]
//     price: number
//   }) => {
//     try {
//       const res = await api.post('/api/products', product)
//       console.log('res', res.data)
//       return res.data
//     } catch (error) {
//       console.log(error)
//     }
//   }
// )

export const createProductThunk = createAsyncThunk(
  'products/create',
  async (newProduct: Product) => {
    try {
      const response = await api.post('/api/products', newProduct)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getSearch: (state, action) => {
      state.search = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload
      return state
    })
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state.selectedProduct = action.payload
      return state
    })
    builder.addCase(deleteProductsThunk.fulfilled, (state, action) => {
      const productId = action.payload
      const deleteProduct = state.items.filter((product) => product._id !== productId)
      state.items = deleteProduct
      return state
    })
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      const newProduct = action.payload
      state.items.push(newProduct)
    })
    builder.addCase(editProductThunk.fulfilled, (state, action) => {
      const productId = action.payload
      if (productId) {
        const uptadetproducts: any = state.items.map((product) =>
          product._id === productId._id ? productId : product
        )
        state.items = uptadetproducts
        console.log(state.items)
        return state
      }
    })
  }
})
export const { getSearch } = productSlice.actions

export default productSlice.reducer
