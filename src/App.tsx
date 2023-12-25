import { Navigate, Route, Routes, useNavigate } from 'react-router'

import './App.css'
import CategoriesForm from './components/admin dashboard/CategoriesForm'
import EditProduct from './components/admin dashboard/EditProduct'
import OrdersList from './components/admin dashboard/OrdersList'
import { ProductsManager } from './components/admin dashboard/ProductsManager'
import UsersList from './components/admin dashboard/UsersList'
import AdminRoute from './components/adminComponents/AdminRoute'
import Login from './components/homeComponents/Login'
import Navbar from './components/homeComponents/Navbar'
import ProductDetails from './components/homeComponents/ProductDetails'
import ProductsMainPage from './components/homeComponents/ProductsMainPage'
import Regeregister from './components/homeComponents/Regeregister'
import UserProfile from './components/usersComponents/UserProfile'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import { ResetPassword } from './components/ResetPassword'
import { ForgotPassword } from './components/ForgotPassword'
import { getDecodedTokenFromStorage, getTokenFromStorage } from './utils/token'
import { useEffect, useState } from 'react'

function App() {
  const navigate = useNavigate()
  const decodedToken = getDecodedTokenFromStorage()
  const [isTokenExpired, setIsTokenExpired] = useState(false)

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('token')
        console.log('Time Expired')
        setIsTokenExpired(true)
      }
    }
  }, [decodedToken])

  if (isTokenExpired) {
    // Toast your session is expired please login again
  }
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsMainPage />} />
        <Route path="/regesteration" element={<Regeregister />} />
        <Route path="/USER/:id" element={<UserProfile />} />
        <Route path="/admin/products/:id" element={<EditProduct />} />
        <Route path="/reset-password/:forgotPasswordCode" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<ProductsManager />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/categories" element={<CategoriesForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
