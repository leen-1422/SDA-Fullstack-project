import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, productsRequest, productsSuccess, getSearch} from '../redux/slices/products/productSlice';
import { categoriesRequest, categoriesSuccess, setSelectedCategory } from '../redux/slices/categoriesSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import { Link } from 'react-router-dom';


export default function ProductsMainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const products = state.products;
  const cartItems = state.cart.cartItems;
  const categories = state.categories
  const search = state.products.search
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleGetProducts();
    handleGetCategories()
  }, []);

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

  const filterProductsbyCategory = (categoryId: number | null, productsList: Product[], searchProducts: Product[]) => {
    if (categoryId == null) {
      return searchProducts;
    }
    return searchProducts.filter((product) => product.categories.includes(categoryId as number));
    if (filteredProducts.length === 0) {
      return productsList
    }
  };




  // const filteredProducts = searchValue === '' ? Products : filterProductsbyCategory(selectedCategoryId, Products, searchProducts);


  const searchProducts = products.items.filter((product) => {
    return search === '' ? product : product.name.toLowerCase().includes(search.toLowerCase());
  });

  const filteredProducts = filterProductsbyCategory(selectedCategoryId, Products, searchProducts)

  const handleCategoryChange = (categoryId: number) => {
    dispatch(setSelectedCategory(categoryId))
  }

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(getSearch(searchValue));
  };




  


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div>
        <form onSubmit={handleSearch}>
    <div className="flex">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
            <select
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
            id="category"
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
            value={state.categories.selectedCategoryId || ''}>
            <option value=""   >All Categories</option>
            {categories.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

        <div className="relative w-full">
            <input type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
             id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mobile, Laptop, Watches..." required/>
            <button 
             
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>
        </div>
        {products.isLoading && <h3>Loading products...</h3>}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div className="group" key={product.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={product.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <Link to={`products/${product.id}`}>
                <button className="mt-1 text-lg font-medium text-gray-900">More details</button>
              </Link>
              
              <button onClick={() => dispatch(addToCart(product))   }  className="mt-1 text-lg font-medium text-gray-900">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}