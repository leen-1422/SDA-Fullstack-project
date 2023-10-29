import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  
}

export type InitialState = {

  categories: Product[]
  selectedCategoryId: number
  error: null | string
  isLoading: boolean
}

const initialState: InitialState = {
    categories: [],
    selectedCategoryId:0,
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
      state.categories = action.payload
    },
    setSelectedCategory:(state,action) =>{
      state.selectedCategoryId = action.payload
      
    },
    addCategory: (state, action) => {
      state.categories = [action.payload.category, ...state.categories]
    },
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredItems = state.categories.filter(
        (category) => category.id !== action.payload.categoryId
      )
      state.categories = filteredItems
    },
    updateCategory: (state, action: { payload: { editCategory: Product } }) => {
      const filteredItems = state.categories.filter(
        (product) => product.id !== action.payload.editCategory.id
      )
      state.categories = filteredItems
      state.categories = [action.payload.editCategory, ...state.categories]
    }
  }
});

export const {  categoriesRequest, categoriesSuccess,setSelectedCategory, addCategory, removeCategory,updateCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
