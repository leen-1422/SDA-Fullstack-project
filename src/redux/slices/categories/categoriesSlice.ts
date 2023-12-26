import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import api from '../../../api'

export type Category = {
  _id: string
  name: string
}

export type InitialState = {
  items: Category[]
  selectedCategoryId: string
  error: null | string
  isLoading: boolean
}

const initialState: InitialState = {
  items: [],
  selectedCategoryId: '',
  error: null,
  isLoading: false
}

//categories thunk

export const getCategoriesThunk = createAsyncThunk('categories/get', async () => {
  try {
    const res = await api.get('/api/categories')
    return res.data
  } catch (error) {
    console.log(error)
  }
})

export const deleteCategoryThunk = createAsyncThunk(
  'category/delete',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/categories/${categoryId}`)
      return categoryId
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// add category function
export const addCategoryThunk = createAsyncThunk(
  'categories/post',
  async (newCategory: Category, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/categories', newCategory)
      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const editCategoryThunk = createAsyncThunk(
  'categories/edit',
  async (
    { name, categoryId }: { name: string; categoryId: Category['_id'] },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put(`api/categories/${categoryId}`, {
        name,
        categoryId
      })
      return res.data.category
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.items = action.payload
      return state
    })
    builder.addCase(addCategoryThunk.fulfilled, (state, action) => {
      state.items = [action.payload.category, ...state.items]
    })
    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const categoryId = action.payload
      const deleteCategory = state.items.filter((category) => category._id !== categoryId)
      state.items = deleteCategory
      return state
    })
    builder.addCase(editCategoryThunk.fulfilled, (state, action) => {
      const categoryId = action.payload._id
      const updatedCatgory = state.items.map((category) => {
        if (category._id === categoryId) {
          return action.payload
        }
        return category
      })
      state.items = updatedCatgory
      return state
    })
  }
})

export const { setSelectedCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
