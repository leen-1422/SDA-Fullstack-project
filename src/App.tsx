import { ProductsManager } from './pages/ProductsManager'
import './App.css'
import Home from './pages/Home'
import { Outlet, Route, Router, Routes } from 'react-router'
import Navbar from './components/homeComponents/Navbar'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './components/homeComponents/Login'
import ProductDetails from './components/homeComponents/ProductDetails'
import UsersList from './components/usersComponents/UsersList'
import OrdersList from './components/ordersComponent/OrdersList'
import Categories from './components/categoriesComponents/Categories'


import { Link } from 'react-router-dom'

import UserProfile from './components/usersComponents/UserProfile'


import AdminRoute from './components/adminComponents/AdminRoute'
import ProductsMainPage from './components/homeComponents/ProductsMainPage'
import Regeregister from './components/homeComponents/Regeregister'







function App() {
  return (
    <div >

<Navbar/>

      <Routes>
      
        <Route path='/' element={<Home />} /> 
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/products/:id" element={<ProductDetails />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/products' element={<ProductsMainPage />} /> 
        <Route path='/regesteration' element={<Regeregister/>} />
        <Route path='/visitor' element={<UserProfile/>} />
        
        
      <Route  element={<AdminRoute />} > 
        <Route path='/admin' element={<ProductsManager />} />
        <Route path='/users' element={<UsersList />} /> 
        <Route path='/orders' element={< OrdersList />} /> 
        <Route path='/categories' element={<Categories />} /> 


       
        </Route>  

      </Routes>


    </div>
  )
}



export default App
