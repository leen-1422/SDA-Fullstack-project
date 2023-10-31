import { createSlice } from '@reduxjs/toolkit'

export type Product = {
  id: number
  name: string
  image: string 
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  categoryId: null | number 
  price: number
}

export type ProductState = {
  
  items: Product[]
  error: null | string
  isLoading: boolean
  selectedProduct: Product| null,
  search:string 
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false,
  selectedProduct: null,
  search:''
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
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },



    editProduct: (state, action: { payload: { editedProduct: Product } }) => {
      const editedProduct = action.payload.editedProduct;
    
      state.items = state.items.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
    },
       
    getSearch: (state,action)=>{
      state.search= action.payload
  },

    
    
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess, editProduct, getSearch} = productSlice.actions

export default productSlice.reducer
