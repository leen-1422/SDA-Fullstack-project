import { Route, Routes } from 'react-router'
import './App.css'
import Categories from './components/categoriesComponents/Categories'
import Login from './components/homeComponents/Login'
import Navbar from './components/homeComponents/Navbar'
import ProductDetails from './components/homeComponents/ProductDetails'
import OrdersList from './components/ordersComponent/OrdersList'
import UsersList from './components/usersComponents/UsersList'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import { ProductsManager } from './pages/ProductsManager'

import UserProfile from './components/usersComponents/UserProfile'

import AdminRoute from './components/adminComponents/AdminRoute'
import ProductsMainPage from './components/homeComponents/ProductsMainPage'
import Regeregister from './components/homeComponents/Regeregister'
import { useEffect } from 'react'
import axios from 'axios'
import ProductModal from './components/modal/ProductModal'

function App() {



  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsMainPage />} />
        <Route path="/regesteration" element={<Regeregister />} />
        <Route path="/visitor" element={<UserProfile />} />
        <Route path="/admin/products/:productId" element={<ProductModal />} />

         {/* <Route element={<AdminRoute />}>  */}
          <Route path="/admin" element={<ProductsManager />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/categories" element={<Categories />} />
      {/* </Route>  */}
      </Routes>
    </div>
  )
}

export default App
