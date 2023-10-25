import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import api from '../api'
import {ordersRequest, ordersSuccess} from '../redux/slices/ordersSlice'

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
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
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
