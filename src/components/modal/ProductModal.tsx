import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Product, editProduct, addProduct } from '../../redux/slices/products/productSlice'
import api from '../../api'

export default function ProductModal() {
  const dispatch = useDispatch<AppDispatch>
  const products = useSelector((state: RootState) => state.products.items)
  console.log(products)

  const [product, setProduct] = useState({
    _id: 0,
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newValue = name === 'price' ? parseFloat(value) : value
    const isList = name === 'sizes'

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



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/api/products', product)


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Create new product</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                onChange={handleProductChange}
                name="name"
                type="text"
                placeholder="product Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                onChange={handleProductChange}
                name="image"
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                onChange={handleProductChange}
                name="category"
                type="text"
                placeholder="Category"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                onChange={handleProductChange}
                name="description"
                type="text"
                placeholder="Description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sizes</span>
              </label>
              <input
                value={selectedProduct ? selectedProduct.sizes.join(',') : product.sizes.join(',')}
                onChange={handleProductChange}
                name="sizes"
                type="text"
                placeholder="Sizes"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                onChange={handleProductChange}
                name="price"
                type="number"
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Product</button>
            </div>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null
                if (modal) {
                  modal.close()
                }
              }}>
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
