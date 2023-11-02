import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, productsRequest, productsSuccess, getSearch} from '../redux/slices/products/productSlice';
import { categoriesRequest, categoriesSuccess, setSelectedCategory } from '../redux/slices/categoriesSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


export default function ProductsMainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;
  const cartItems = state.cart.cartItems;
  const categories = state.categories
  const search = state.products.search
  const [searchValue, setSearchValue] = useState('');
  
  // const [currentPage,setCurrentPage]= useState(1)
  // const itemsPerPage= 3;
  // const totalPages = state.products.items.length / itemsPerPage
  // const indexOfLAstItem= currentPage * itemsPerPage
  // const indexOfFirstItem= indexOfLAstItem -itemsPerPage
  // const currentItems = products.items.slice(indexOfFirstItem,indexOfLAstItem )

  useEffect(() => {
    handleGetProducts();
    handleGetCategories()
  }, []);

  // const handelPagechange = (page:number) =>{
  //   setCurrentPage(page)
  // }

  const handleGetCategories = () => {
    dispatch(categoriesRequest())
    api
      .get('/mock/e-commerce/categories.json')
      .then((res) => dispatch(categoriesSuccess(res.data)))
      .catch((error) => console.error('Error fetching categories:', error))
  }

  const handleGetProducts = async () => {
    dispatch(productsRequest());
      const res = await api.get('/mock/e-commerce/products.json');
      dispatch(productsSuccess(res.data));
    
  };
  
  const Products: Product[] = state.products.items
  const selectedCategoryId: number | null = state.categories.selectedCategoryId

  const filterProductsbyCategory = (categoryId: number, productsList: Product[]) => {
    if (categoryId == 0) {
      return productsList;
    }
    
    return productsList.filter((product) => product.categories.includes(categoryId as number));
    if (filteredProducts.length === 0) {
      return productsList
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId))
  }



  const filteredProducts = filterProductsbyCategory(selectedCategoryId, Products)


  const handelSearch = (event: ChangeEvent<HTMLInputElement>)=>{
    dispatch(getSearch(event.target.value))


  }
  const filterProductbySearch = (products: Product[], searchKeyWord: string) => {
    return searchKeyWord
      ? products.filter((product) =>
          product.name.toLocaleLowerCase().includes(searchKeyWord.toLocaleLowerCase())
        )
      : products
  }

  const filteredAndSearchedProducts = filterProductbySearch(filteredProducts, search)
  


  return (
    <div className="bg-white">



      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div>
        <div>
    <div className="flex mb-12">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
            <select
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
            id="category"
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
            value={state.categories.selectedCategoryId || ''}>
            <option value={0}   >All Categories</option>
            {categories.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

        <div className="relative w-full">
            <input type="search"
            value={search}
            onChange={handelSearch}
             id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mobile, Laptop, Watches..." required/>

        </div>
    </div>
</div>
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.isLoading ? (
            <h3 style={{ textAlign: 'center', color: 'red' }}>Loading products...</h3>
          ) : (
            filteredAndSearchedProducts.map((product) => (
              <div key={product.id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper ."
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h1 className='font-semibold'>{product.name}</h1>

        
              <h1><span>{product.price} SAR</span></h1>

              <div className='flex justify-between mt-4'>
              <Link to={`products/${product.id}`}>
              <button className="bg-transparent hover:bg-green-900 text-black-700 font-semibold hover:text-white py-2 px-4 border border-green-900 hover:border-transparent rounded">
  Mode details
</button>
                {/* <button className="mt-1 text-lg font-medium text-gray-900">More details</button> */}
              </Link>
              

              
              <button onClick={() => dispatch(addToCart(product))   }  className="mt-1 ml-99 text-lg font-medium text-gray-900 mx-9 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
</button>

              </div>
              
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}