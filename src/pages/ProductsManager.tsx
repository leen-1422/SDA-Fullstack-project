import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Product,
  addProduct,
  deleteProductsThunk,
  editProduct,
  getProductsThunk,
  removeProduct
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import ProductModal from '../components/modal/ProductModal'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  const [product, setProduct] = useState({
    _id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: []
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [products])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: isList ? value.split(',') : value
      }))
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: isList ? value.split(',') : value
      }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedProduct && selectedProduct._id) {
      const updatedProduct = { ...selectedProduct }
      dispatch(editProduct({ editedProduct: updatedProduct }))
    } else {
      const newProduct = { ...product, id: new Date().getTime() }
      dispatch(addProduct({ product: newProduct }))
    }
    setProduct({
      _id: 0,
      name: '',
      image: '',
      description: '',
      categories: [],
      variants: [],
      sizes: []
    })
    setSelectedProduct(null)
  }

  const handleEditBtnClick = (id: string) => {
    console.log(id)
  }

  const handelDeleteProduct = (id: string) => {
    dispatch(deleteProductsThunk(id))
  }

  return (
    <div className="flex">
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6">
            {/* <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
              <div className="flex">
                <div className="mr-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedProduct ? selectedProduct.name : product.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Product Name"
                  />
                </div>
                <div className="mr-2">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={selectedProduct ? selectedProduct.image : product.image}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Image Url"
                  />
                </div>
              </div>

              <div className="flex mt-2">
                <div className="mr-2">
                  <input
                    name="description"
                    id="description"
                    value={selectedProduct ? selectedProduct.description : product.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Description"
                    type="text"
                  />
                </div>
                <div className="mr-2">
                  <input
                    type="text"
                    name="categories"
                    id="categories"
                    value={
                      selectedProduct
                        ? selectedProduct.category.join(',')
                        : product.categories.join(',')
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Categories"
                  />
                </div>
              </div>

              <div className="flex mt-2">
                <div className="mr-2">
                  <input
                    type="text"
                    name="sizes"
                    id="sizes"
                    value={
                      selectedProduct ? selectedProduct.sizes.join(',') : product.sizes.join(',')
                    }
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Sizes"
                  />
                </div>
              </div>

              <button
                className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedProduct ? 'Edit Product' : 'Add Product'}
              </button>
            </form> */}

            <button
              className="btn"
              onClick={() => {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null
                if (modal) {
                  modal.showModal()
                }
              }}>
              Add product
            </button>
          </div>

          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/7 py-4 px-6 text-left text-gray-600 font-bold">Count</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Image</th>
                <th className="w-1/5 py-4 px-6 text-left text-gray-600 font-bold">Name</th>

                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Categories</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Sizes</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Price</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products.items.map((item, index) => (
                <tr key={item._id}>
                  <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <img src={item.image} width={100} />
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>

                  <td className="py-4 px-6 border-b border-gray-200">
                    {item.category.map((item) => (
                      <>
                        <span>{item.name} </span>
                      </>
                    ))}
                  </td>

                  <td className="py-4 px-6 border-b border-gray-200">
                    {item.sizes.map((size, index) => (
                      <span key={index} className="mr-2">
                        {size}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">{item.price}</td>

                  <td className="py-4 px-6  border-gray-200 whitespace flex mt-9 ">
                    <Link to={`products/${item._id}`}>
                      <button className="mr-1 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-600 py-2 px-4 font-small">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handelDeleteProduct(item._id)}
                      className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal />
    </div>
  )
}
