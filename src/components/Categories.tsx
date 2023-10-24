import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import api from '../api';
import { categoriesActions } from '../redux/slices/categoriesSlice';

export default function Categories() {
    
    const dispatch = useDispatch<AppDispatch>()
    const catiegores = useSelector((state: RootState) => state.categories.categories);
    console.log(catiegores)


    const handleGetCategories = async () => {
        dispatch(categoriesActions.categoriesRequest())
    
        const res = await api.get('/mock/e-commerce/categories.json')
        dispatch(categoriesActions.categoriesSuccess(res.data))
      }
      useEffect(() => {
        handleGetCategories()
      }, [])

  return (

    <div>


        
        <div className='container'>
            {catiegores.map((section) => (
            <div  key={section.id}>     
            <h3>{section.name}</h3>
        </div>
        
        

      ))}

      </div>

    </div>
  )
}
