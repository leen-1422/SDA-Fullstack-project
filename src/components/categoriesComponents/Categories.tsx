import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import api from '../../api';
import { categoriesRequest, categoriesSuccess,setSelectedCategory } from '../../redux/slices/categories/categoriesSlice';
import CategoriesForm from './CategoriesForm';
import { Link } from 'react-router-dom';

export default function Categories() {
  
  return (

    <div>
      <CategoriesForm/>

    </div>
        


    
  )
}
