import { Route, Routes } from 'react-router'
import './App.css'
import Categories from './components/admin dashboard/Categories'
import Login from './components/homeComponents/Login'
import Navbar from './components/homeComponents/Navbar'
import ProductDetails from './components/homeComponents/ProductDetails'
import OrdersList from './components/admin dashboard/OrdersList'
import UsersList from './components/admin dashboard/UsersList'
import About from './pages/About'
import Cart from './pages/Cart'
import Home from './pages/Home'
import { ProductsManager } from './components/admin dashboard/ProductsManager'

import UserProfile from './components/usersComponents/UserProfile'

import AdminRoute from './components/adminComponents/AdminRoute'
import ProductsMainPage from './components/homeComponents/ProductsMainPage'
import Regeregister from './components/homeComponents/Regeregister'

import EditProduct from './components/admin dashboard/EditProduct'

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
        <Route path="/admin/products/:id" element={<EditProduct />} />

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
