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
    addProduct: (state, action: { payload: { product: Product } }) => {
      // let's append the new product to the beginning of the array
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productId)
      state.items = filteredItems
    },

    editProducts: (state, action) => {
      const { id, name, image, description, categories, variants, sizes } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.name = name;
        product.image = image;
        product.description = description;
        product.categories = categories;
        product.variants = variants;
        product.sizes = sizes;
      }
    },
    getSearch: (state,action)=>{
      state.search= action.payload
  },

    
    
  }
})
export const { removeProduct, addProduct, productsRequest, productsSuccess, editProducts, getSearch} = productSlice.actions

export default productSlice.reducer
