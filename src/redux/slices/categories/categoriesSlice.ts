import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategoryId = action.payload
    },
    addCategory: (state, action) => {
      state.items = [action.payload.category, ...state.items]
      toast.success('new category is added', {
        position: 'bottom-left'
      })
    },
    removeCategory: (state, action: { payload: { categoryId: string } }) => {
      const filteredItems = state.items.filter(
        (category) => category._id !== action.payload.categoryId
      )
      state.items = filteredItems
      toast.error('category is removed', {
        position: 'bottom-left'
      })
    },
    updateCategory: (state, action: { payload: { editCategory: Category } }) => {
      const filteredItems = state.items.filter(
        (product) => product._id !== action.payload.editCategory._id
      )
      state.items = filteredItems
      state.items = [action.payload.editCategory, ...state.items]
      toast.success('category is updated', {
        position: 'bottom-left'
      })
    }
  }
})

export const {
  categoriesRequest,
  categoriesSuccess,
  setSelectedCategory,
  addCategory,
  removeCategory,
  updateCategory
} = categoriesSlice.actions

export default categoriesSlice.reducer
