import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import {
  Product,
  editProductThunk,
  getSingleProductThunk
} from '../../redux/slices/products/productSlice'
import { AppDispatch } from '../../redux/store'

export default function EditProduct() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    _id: '',
    name: '',
    image: '',
    description: '',
    category: [],
    sizes: [],
    price: 0
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(getSingleProductThunk(id))
        .then((response) => {
          const productData = response.payload
          console.log(productData)
          setProduct(productData)
        })

        .catch((error) => {
          console.log(error)
        })
    }
  }, [id, dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newValue = name === 'price' ? parseFloat(value) : value
    const isList = name === 'sizes' || name === 'category'

    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct!,
        [name]: isList ? value.split(',') : newValue
      }))
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: isList ? value.split(',') : newValue
      }))
    }
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    try {
      if (product._id) {
        dispatch(editProductThunk({ productId: product._id, updatedProduct: product }))
        navigate('/admin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mr-2">
            <input
              type="text"
              name="name"
              id="name"
              value={product.name}
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
              onChange={handleChange}
              value={product.image}
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
              onChange={handleChange}
              value={product.description}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
              placeholder="Description"
              type="text"
            />
          </div>
          <div className="mr-2">
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={product.category.join(',')}
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
              onChange={handleChange}
              value={product.sizes.join(',')}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
              placeholder="Sizes"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="mr-2">
            <input
              type="text"
              name="price"
              id="price"
              onChange={handleChange}
              value={product.price}
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
              placeholder="Price"
            />
          </div>
        </div>

        <button
          className="mt-3 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Edit
        </button>
      </form>
    </div>
  )
}
