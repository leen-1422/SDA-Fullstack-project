import React, { Component } from 'react'
import Categories from '../components/Categories'
import CategoriesForm from '../components/CategoriesForm'
import { ProductsManager } from '../components/ProductsManager'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

export class AdminPage extends Component {
  render() {
    return (
      <div>

        {/* <Link to="/users">
        <Button variant="contained">Users</Button>
        </Link>

        <Link to="/orders">
        <Button variant="contained">Orders</Button>
        </Link>

        <Link to="/categories">
        <Button variant="contained">Catigores</Button>
        </Link>

         */}

        
        <ProductsManager/>

      </div>
    )
  }
}

export default AdminPage