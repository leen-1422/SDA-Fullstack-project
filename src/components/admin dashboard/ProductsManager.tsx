import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteProductsThunk, getProductsThunk } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import ProductModal from './modal/ProductModal'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  const handelDeleteProduct = (id: string) => {
    dispatch(deleteProductsThunk(id))
  }

  return (
    <div className="flex">
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6">
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
                    <Link to={`/admin/products/${item._id}`}>
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
