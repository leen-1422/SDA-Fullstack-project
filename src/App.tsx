import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './pages/Login'
import ProductDetails from './components/ProductDetails'
import UsersList from './components/UsersList'
import OrdersList from './components/OrdersList'
import Categories from './components/Categories'


function App() {
  return (
    <div >

<Navbar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/admin' element={<ProductsManager />} /> 
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/login' element={<Login />} /> 
        
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/users' element={<UsersList />} /> 
        <Route path='/orders' element={< OrdersList />} /> 
        <Route path='/categories' element={<Categories />} /> 
      </Routes>
    </div>
  )
}



export default App
