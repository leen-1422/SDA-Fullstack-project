import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux' 
import { AppDispatch, RootState } from '../redux/store' 
import api from '../api' 
import { Product, categoriesRequest, categoriesSuccess } from '../redux/slices/categoriesSlice'

 
export default function Categories() { 
  const dispatch = useDispatch<AppDispatch>() 
  const categories = useSelector((state: RootState) => state.categories.categories) 
 
  const [editedCategory, setEditedCategory] = useState({ id: 0, name: '' }) 
  const [newCategory, setNewCategory] = useState('') 
 
  const handleGetCategories = async () => { 
    dispatch(categoriesRequest()) 
 
    const res = await api.get('/mock/e-commerce/categories.json') 
    dispatch(categoriesSuccess(res.data)) 
  } 
 
  useEffect(() => { 
    handleGetCategories() 
  }, []) 
 
  const handleEditCategory = (category: Product) => { 
    const updatedCategory = { ...category } 
    setEditedCategory(updatedCategory) 
  } 
 
  const handleSaveCategory = () => { 
    const updatedCategory = { ...editedCategory, name: editedCategory.name } 
 
    dispatch( editCategory({ 
        categoryId: editedCategory.id, 
        updatedCategory 
      }) 
    ) 
    setEditedCategory({ id: 0, name: '' }) 
  } 
 
  const handleAddCategory = () => { 
    if (newCategory.trim() !== '') { 
      dispatch(addCategory(newCategory)) 
      setNewCategory('') 
    } 
  } 
 
  return ( 
    <div className="container mx-auto py-4"> 
      <h1 className="text-2xl font-bold">List of all Categories</h1> 
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-8"> 
        {categories.map((category) => ( 
          <div key={category.id} className="bg-white p-4 rounded-md shadow-md"> 
            <h3 className="mt-4 text-sm text-gray-700">{category.name}</h3> 
            <div className="mt-4"> 
              <button 
                className="bg-red-500 text-white text-xs py-1 px-2 rounded-md mr-2" 
                onClick={() => 
                  dispatch(removeCategory({ categoryId: category.id })) 
                }> 
                Delete 
              </button> 
              <button 
                className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md" 
                onClick={() => handleEditCategory(category)}> 
                Edit 
              </button> 
            </div> 
          </div> 
        ))} 
        {editedCategory.id !== 0 && ( 
          <div className="bg-white p-4 rounded-md shadow-md"> 
            <input 
              type="text" 
              value={editedCategory.name} 
              onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })} 
              className="border border-gray-300 rounded-md p-1 mr-2" 
            /> 
            <button 
              className="bg-green-500 text-white text-xs py-1 px-2 rounded-md" 
              onClick={handleSaveCategory}> 
              Save 
            </button> 
          </div> 
        )} 
      </div> 
      <div className="mt-4"> 
        <input 
          type="text" 
          placeholder="New Category Name" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          className="border border-gray-300 rounded-md p-1 mr-2" 
        /> 
        <button 
          className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md" 
          onClick={handleAddCategory}> 
          Add Category 
        </button> 
      </div> 
    </div> 
  ) 
}