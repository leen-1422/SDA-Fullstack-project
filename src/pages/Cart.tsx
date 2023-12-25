import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, decreaseCart, removeProduct } from '../redux/slices/cart/cartSlice'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect } from 'react'
import { AxiosError } from 'axios'
import api from '../api'
import { Product } from '../redux/slices/products/productSlice'

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const cartItems = state.cart.cartItems

  console.log('cartItems', cartItems)
  const { userData } = useSelector((state: RootState) => state.users)

  console.log(userData)

  const newTotalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleDecreaseAmountBtnClick = (id: string) => {
    dispatch(decreaseCart({ productId: id }))
  }

  const handleIncreaseAmountBtnClick = (item: Product) => {
    dispatch(addToCart(item))
  }
  const handelPlaceOrder = async () => {
    // const userId = userData && userData.userId;
    // const orderItems = cartItems.map((item) => item._id)
    // const address = {
    //   shippingAddress: 'alsoodfa',
    //   city: 'abha',
    //   zipCode: '35647',
    //   country: 'SAfgyjhgfukj',
    //   phone: '0544356789'
    // }
    // console.log("orderItems", orderItems)
    // console.log("user data", userId)

    const placeOrderData = {
      userId: userData && userData.userId,
      orderItems: cartItems.map((item) => ({ product: String(item._id), quantity: item.quantity })),
      shippingAddress: 'alsoodfa',
      city: 'abha',
      zipCode: '35647',
      country: 'SAfdchgm',
      phone: '0544356789'

      // userId,
      // orderItems,
      // address
    }

    try {
      const res = await api.post('/api/orders', placeOrderData)
      localStorage.removeItem('cartItems')
      console.log('sucssful added')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    handelPlaceOrder()
  }, [])

  return (
    <div className="h-screen bg-gray-100 pt-20">
      {cartItems.length === 0 ? (
        <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-24 w-24 text-gray-400 mb-4">
              <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
            </svg>
            <p className="text-gray-600 text-lg font-semibold mb-4">Your shopping cart is empty.</p>
            <Link
              to="/products"
              className="px-6 py-2 bg-purple-500 text-white rounded-md shadow-md hover:bg-purple-600 transition-colors duration-300">
              Let's go shopping!
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img src={item.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                      <p className="mt-1 text-xs text-gray-700">{item.sizes}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <button
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-purple-500 hover:text-blue-50"
                          onClick={() => handleDecreaseAmountBtnClick(item._id)}>
                          {' '}
                          -{' '}
                        </button>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                        />
                        <button
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-purple-500 hover:text-blue-50"
                          onClick={() => handleIncreaseAmountBtnClick(item)}>
                          {' '}
                          +{' '}
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">{item.price}</p>
                        <button
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => dispatch(removeProduct({ productId: item._id }))}>
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div>
                <div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">{newTotalAmount} SAR </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">20 SAR</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">{newTotalAmount + 20} SAR</p>

                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <button
                    onClick={handelPlaceOrder}
                    className="mt-6 w-full rounded-md bg-purple-500 py-1.5 font-medium text-blue-50 hover:bg-purple-400">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
