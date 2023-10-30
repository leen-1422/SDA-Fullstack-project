import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './pages/Home'
import { Outlet, Route, Router, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './components/Login'
import ProductDetails from './components/ProductDetails'
import UsersList from './components/UsersList'
import OrdersList from './components/OrdersList'
import Categories from './components/Categories'
import Products from './pages/Products'
// import AdminPage from './pages/AdminPage'
import { Link } from 'react-router-dom'

import UserProfile from './components/UserProfile'
// import ProtectedRoute from './components/AdminRoute'
import AdminPage from './pages/AdminPage'
import AdminRoute from './components/AdminRoute'



function App() {
  return (
    <div >

<Navbar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/about' element={<About />} /> 
       
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path='/login' element={<Login />} /> 

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
