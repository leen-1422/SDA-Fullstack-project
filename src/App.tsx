import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import About from './pages/About'
import Login from './pages/Login'
import ProductDetails from './components/ProductDetails'


function App() {
  return (
    <div >

<Navbar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/shop' element={<ProductsManager />} /> 
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}



export default App
