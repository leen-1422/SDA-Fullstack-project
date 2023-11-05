import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api'
import { ordersRequest, ordersSuccess } from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function OrdersList() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const ordersList = state.orders
  useEffect(() => {
    handleGetUsers()
  }, [])
  const handleGetUsers = async () => {
    dispatch(ordersRequest())

    const res = await api.get('/mock/e-commerce/orders.json')
    dispatch(ordersSuccess(res.data))
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {ordersList.isLoading && <h3> Loading products...</h3>}
        <div className="card grid gap-4">
          <ul>
            {ordersList.orders.map((order) => (
              <li key={order.id} className="flex items-center gap-4 text-2xl mb-2">
                <span>{order.productId}</span>
                <span>{order.purchasedAt}</span>
                <span>{order.userId}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
