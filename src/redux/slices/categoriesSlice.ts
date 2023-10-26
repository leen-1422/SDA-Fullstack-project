import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  image:string
}

export type InitialState = {

  categories: Product[]
  selectedCategoryId: null |number
  error: null | string
  isLoading: boolean
}

const initialState: InitialState = {
    categories: [],
    selectedCategoryId:null,
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
      
    }

    
  }
})
export const {  categoriesRequest, categoriesSuccess,setSelectedCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
