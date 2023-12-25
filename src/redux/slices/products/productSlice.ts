import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../../../api'
import { Category } from '../categories/categoriesSlice'
import { AxiosError } from 'axios'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  category: Category[]
  sizes: string[]
  categoryId: null | string
  price: number
  quantity: number
}

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
  selectedProduct: Product | null
  search: string
  pageInfo: {
    page: number
    totalItems: number
  }
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  selectedProduct: null,
  search: '',

  pageInfo: {
    page: 0,
    totalItems: 0
  }
}

//products thunk

export const getProductsThunk = createAsyncThunk('products/get', async () => {
  try {
    const res = await api.get('/api/products')
    return res.data
  } catch (error) {
    console.log('👀 ', error)
  }
})
export const getProductsRequestThunk = createAsyncThunk('request/get', async (params: string) => {
  try {
    console.log('==', params)
    const res = await api.get(`/api/products?${params}`)
    console.log('res from requst products thunk', res.data)
    return res.data.result
  } catch (error) {
    console.log('err', error)
  }
})

export const getProductsForAdminThunk = createAsyncThunk('adminProducts/get', async () => {
  try {
    const res = await api.get('/api/products/admin')
    return res.data
  } catch (error) {
    console.log('👀 ', error)
  }
})

export const getSingleProductThunk = createAsyncThunk(
  'product/get',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/products/${productId}`)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const deleteProductsThunk = createAsyncThunk(
  'products/delete',
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/products/${productId}`)
      return productId
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const editProductThunk = createAsyncThunk(
  'products/edit',
  async (
    { productId, updatedProduct }: { productId: string; updatedProduct: Product },
    { rejectWithValue }
  ) => {
    try {
      await api.put(`/api/products/${productId}`, updatedProduct)
      return updatedProduct
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const addProductThunk = createAsyncThunk(
  'products/add',
  async (newProduct: Product, { rejectWithValue }) => {
    try {
      await api.post('/api/products/', newProduct)
      return newProduct
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getSearch: (state, action) => {
      state.search = action.payload
    },
    productSucssess: (state, action) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.items = action.payload?.result
      state.pageInfo.page = action.payload.infoOfPage.page
      state.pageInfo.totalItems = action.payload.infoOfPage.totalItems

      return state
    })
    builder.addCase(getProductsRequestThunk.fulfilled, (state, action) => {
      state.items = action.payload?.infoOfPage
      state.pageInfo.page = action.payload?.page
      state.pageInfo.totalItems = action.payload?.totalItems

      state.isLoading = false
      return state
    })
    builder.addCase(getProductsForAdminThunk.fulfilled, (state, action) => {
      state.items = action.payload.products
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
    builder.addCase(addProductThunk.fulfilled, (state, action) => {
      const newProduct = action.payload
      if (newProduct) {
        state.items = [newProduct, ...state.items]
      }
      return state
    }),
      builder.addCase(editProductThunk.fulfilled, (state, action) => {
        const productId = action.payload
        if (productId) {
          const uptadetproducts = state.items.map((product) =>
            product._id === productId._id ? productId : product
          )
          state.items = uptadetproducts
          console.log(state.items)
          return state
        }
      })
  }
})
export const { getSearch, productSucssess } = productSlice.actions

export default productSlice.reducer
