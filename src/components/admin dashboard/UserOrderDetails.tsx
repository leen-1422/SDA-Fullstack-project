import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getSingleOrderThunk } from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function UserOrderDetails() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const selectedOrder = useSelector((state: RootState) => state.orders.selectedOrder)

  useEffect(() => {
    if (id) {
      dispatch(getSingleOrderThunk(id))
    }
  }, [id])

  if (!selectedOrder) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Order Information:
          </h1>
          <p className="mt-2 text-base text-gray-500">
            {' '}
            purchasedAt:
            {selectedOrder.purchasedAt}
          </p>
          <p className="mt-2 text-base text-gray-500">
            {' '}
            Status:
            {selectedOrder.status}
          </p>
          <p className="mt-2 text-base text-gray-500">
            {' '}
            Status:
            {selectedOrder.userId._id}
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          {selectedOrder.orderItems.map((order) => (
            <>
              <h2 className="sr-only">Your order</h2>
              <h3 className="sr-only">Items</h3>
              <div className="py-10 border-b border-gray-200 flex space-x-6">
                <img
                  src={order.product.image}
                  className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                />
                <div className="flex-auto flex flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a href="#">{order.product.name} </a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">{order.product.description}</p>
                  </div>
                  <div className="mt-6 flex-1 flex items-end">
                    <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">{order.quantity}</dd>
                      </div>
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{order.product.price} SAR</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Addresses</h4>
            <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
              <div>
                <dt className="font-medium text-gray-900">Shipping address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">
                      {selectedOrder.country}-{selectedOrder.city}
                    </span>
                    <span className="block">
                      {selectedOrder.zipCode} {selectedOrder.shippingAddress}{' '}
                    </span>
                    <span className="block">{selectedOrder.phone}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Personal Information</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">
                      {selectedOrder.userId.firstName} {selectedOrder.userId.lastName}
                    </span>
                    <span className="block">{selectedOrder.userId.email}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">{selectedOrder.total - 20} SAR</dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Shipping</dt>
                <dd className="text-gray-700">20 SAR</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">{selectedOrder.total} SAR</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
