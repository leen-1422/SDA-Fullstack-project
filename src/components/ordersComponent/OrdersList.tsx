import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api'
import {
  deleteOrderThunk,
  getOrdersThunk,
  ordersRequest,
  ordersSuccess,
  updateOrderThunk
} from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'
import axios from 'axios'

export default function OrdersList() {
  const dispatch = useDispatch<AppDispatch>()
  const orders = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [])

  const handelDeleteProduct = (id: string) => {
    dispatch(deleteOrderThunk(id))
  }

  const handelUpdate = (id:string) =>{
    dispatch(updateOrderThunk({ status, id }));

  }




  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        {orders.isLoading && <h3>Loading products...</h3>}
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Receipt</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">purchased At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.orders.map((order) => (
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">
                          {order.userId.firstName} {order.userId.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {' '}
                    {order.orderItems.map((item) => (
                      <>
                        <span>Product:{item.product.name} </span>
                        <span>Qty:{item.quantity} | </span>
                      </>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {' '}
                      {order.status}{' '}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">{order.purchasedAt}</td>
                  <button
                    onClick={() => handelDeleteProduct(order._id)}
                    className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                    Delete
                  </button>
                  <button
                    onClick={() => handelUpdate(order._id)}
                    className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                    Edit
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
