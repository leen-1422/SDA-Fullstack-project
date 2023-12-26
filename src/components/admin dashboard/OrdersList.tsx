import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  deleteOrderThunk,
  getOrdersThunk,
  editOrderStatusThunk,
  Orders,
  Status
} from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { STATUS } from '../../Constant'
import { Link } from 'react-router-dom'

export default function OrdersList() {
  const dispatch = useDispatch<AppDispatch>()
  const orders = useSelector((state: RootState) => state.orders)

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [dispatch])

  const handelDeleteProduct = (id: string) => {
    dispatch(deleteOrderThunk(id))
  }

  const handleUpdateStatus = (e: ChangeEvent<HTMLSelectElement>, orderId: Orders['_id']) => {
    console.log('userId:', orders)
    console.log('selected value:', e.target.value)

    const status = e.target.value as Status
    dispatch(editOrderStatusThunk({ status, orderId }))
  }

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        {orders.isLoading && <h3>Loading products...</h3>}
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Receipt</th>
                <th className="px-4 py-3">Toatl</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">purchased At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.orders.map((order) => (
                <tr key={order._id} className="text-gray-700">
                  <td className="px-4 py-3 border">{order._id}</td>
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
                      <div key={item._id}>
                        <span>Product:{item.product.name} </span>
                        <span>Qty:{item.quantity} </span>
                      </div>
                    ))}
                    <Link to={`/orders/${order._id}`} className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                      Details
                    </Link>
                  </td>

                  <td className="px-4 py-3 border">{order.total}</td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      {' '}
                      {order.status}{' '}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">{order.purchasedAt}</td>
                  <td className="px-4 py-3 text-sm border">
                    <button
                      onClick={() => handelDeleteProduct(order._id)}
                      className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                      Delete
                    </button>
                    <select
                      name="status"
                      title="status"
                      onChange={(e) => handleUpdateStatus(e, order._id)}>
                      <option>Select Status</option>
                      {Object.keys(STATUS).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
