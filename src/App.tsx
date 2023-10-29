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
import Products from './pages/Products'
import EditProduct from './components/EditProduct'
// import EditCategory from './components/EditCategory'


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
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        {/* <Route path="/categories/edit/:id" element={<EditCategory />} /> */}
        
        
      </Routes>
    </div>
  )
}



export default App
