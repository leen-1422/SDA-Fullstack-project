import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useSearchParams } from 'react-router-dom'

import { addToCart } from '../../redux/slices/cart/cartSlice'
import {
  getCategoriesThunk,
  setSelectedCategory
} from '../../redux/slices/categories/categoriesSlice'
import { getProductsThunk, productSucssess } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import api from '../../api'

export default function ProductsMainPage() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams({
    name: '',
    page: ''
  })
  const page = searchParams.get('page') || 0
  const name = searchParams.get('name') || ''

  const state = useSelector((state: RootState) => state)
  const selectedCategoryId: string = state.categories.selectedCategoryId

  const [pagination, setPagination] = useState({
    page,
    totalPages: 0
  })

  const products = state.products
  const currentItems = products.items
  const categories = state.categories.items

  // Pagination state

  const totalPages = pagination.totalPages

  useEffect(() => {
    handleGetProducts()
    dispatch(getCategoriesThunk())
  }, [name, selectedCategoryId])

  const handleGetProducts = async () => {
    const res = await api.get(
      `/api/products?page=${pagination.page}&search=name&name=${name}&category=${selectedCategoryId}`
    )
    const { page, totalPages } = res.data.infoOfPage
    setPagination({ page, totalPages })
    dispatch(productSucssess(res.data.result))
  }

  const handleGetProductsByPage = async (nextPage: number) => {
    const res = await api.get(`/api/products?page=${nextPage}`)

    const { page, totalPages } = res.data.infoOfPage
    setPagination({ page, totalPages })
    setSearchParams({ page })
    dispatch(productSucssess(res.data.result))
  }
  const handleGetProductsByName = async (name: string, nextPage: number) => {
    const res = await api.get(`/api/products?page=${pagination.page}&search=name&name=${name}`)
    const { page, totalPages } = res.data.infoOfPage
    setPagination({ page, totalPages })
    setSearchParams({ page, name })
    dispatch(productSucssess(res.data.result))
  }

  const handleCategoryChange = async (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId))
    setSearchParams({ page: '1', name: '' })

    setPagination({ page: 1, totalPages })
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  const handleSortChange = async (sortOrder: 1 | -1) => {
    try {
      const res = await api.get(
        `/api/products?page=${pagination.page}&sortBy=name&name=${sortOrder}`
      )
      const { page, totalPages } = res.data.infoOfPage
      setPagination({ page, totalPages })
      dispatch(productSucssess(res.data.result))
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div>
          <div>
            <div className="flex mb-12">
              <div className="relative flex justify-center">
                <button
                  className="inline-flex mr-4 gap-4 text-white bg-red-700 hover:bg-red-800 focus-ring-4 text-sm px-5 py-2.5 text-center"
                  onClick={() => handleSortChange(1)}>
                  Sort Ascending
                </button>
                <button
                  className="inline-flex mr-4 gap-4 text-white bg-red-700 hover:bg-red-800 focus-ring-4 text-sm px-5 py-2.5 text-center"
                  onClick={() => handleSortChange(-1)}>
                  Sort Descending
                </button>
              </div>
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
              <select
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                id="category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                // value={selectedValue}
              >
                <option value={''}>All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="relative w-full">
                <input
                  type="search"
                  name="name"
                  onChange={handleSearch}
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Mobile, Laptop, Watches..."
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.isLoading ? (
            <div className="" aria-label="Loading..." role="status">
              <svg className="animate-spin w-10 h-10 fill-slate-800" viewBox="3 3 18 18">
                <path
                  className="opacity-20"
                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
                <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
              </svg>
            </div>
          ) : (
            state.products.items.map((product) => (
              <div key={product._id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image}
                    alt="Tall slender porcelain bottle with natural clay textured body and cork stopper ."
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h1 className="font-semibold">{product.name}</h1>

                <h1>
                  <span>{product.price} SAR</span>
                </h1>

                <div>
                  {product.category.map((category) => (
                    <span>{category.name}</span>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  <Link to={`products/${product._id}`}>
                    <button className="bg-transparent hover:bg-green-900 text-black-700 font-semibold hover:text-white py-2 px-4 border border-green-900 hover:border-transparent rounded">
                      Mode details
                    </button>
                  </Link>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="mt-1 ml-99 text-lg font-medium text-gray-900 mx-9 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-10 flex">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border ${
                pagination.page === pageNumber ? 'bg-gray-500' : 'bg-purple-600'
              }    transition duration-150 ease-in-out hover:bg-light-300`}
              key={pageNumber}
              onClick={() => {
                if (name) {
                  handleGetProductsByName(name, pageNumber)
                } else {
                  handleGetProductsByPage(pageNumber)
                }
              }}
              style={{
                justifyContent: 'center',

                alignItems: 'center',
                padding: '5px',
                margin: '6px',
                color: 'white',
                cursor: 'pointer'
              }}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
