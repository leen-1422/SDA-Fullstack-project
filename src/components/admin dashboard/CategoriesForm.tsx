import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Category,
  deleteCategoryThunk,
  editCategoryThunk,
  getCategoriesThunk
} from '../../redux/slices/categories/categoriesSlice'
import { AppDispatch, RootState } from '../../redux/store'
import CategoryModal from './modal/CategoryModal'

export default function CategoryTable() {
  const dispatch = useDispatch<AppDispatch>()
  const catiegores = useSelector((state: RootState) => state.categories.items)

  const [category, setCategory] = useState({ name: '', _id: '' })

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    })
  }

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (category._id) {
      dispatch(editCategoryThunk({ name: category.name, categoryId: category._id }))
      setCategory({ name: '', _id: '' })
    }
    setSelectedCategory(null)
  }

  const handleEditBtnClick = (selectedCategoryId: Category['_id']) => {
    const selectedCat = catiegores.find((cat) => cat._id === selectedCategoryId)
    if (selectedCat) {
      setSelectedCategory(selectedCat)
      setCategory({ name: selectedCat.name, _id: selectedCat._id })
    }
  }
  const handelDeleteCategory = (id: string) => {
    dispatch(deleteCategoryThunk(id))
  }

  return (
    <div className="flex flex-1 items-center justify-center ">
      <div className="w-3/4 bg-white p-4">
        <div className=" rounded-lg overflow-hidden mx-4 md:mx-10">
          <div className="flex flex-1 items-center justify-center p-6"></div>
          <div>
            <form className="  flex sm:items-center " onSubmit={handleAddSubmit}>
              <div className="ml-60 ">
                <div className="">
                  <input
                    id="name"
                    name="name"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                    placeholder="Enter the category name"
                    type="text"
                    value={category.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                className=" inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 rounded-md hover:bg-gray-500  px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Edit Category
              </button>
            </form>
            <button
              className="btn"
              onClick={() => {
                const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null
                if (modal) {
                  modal.showModal()
                }
              }}>
              Add Category
            </button>
          </div>
          <table className="w-full table-fixed border">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">ID</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {catiegores.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="py-4 px-6 border-b border-gray-200">{item._id}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{item.name}</td>

                    <td className="py-4 px-6 border-b border-gray-200 whitespace">
                      <button
                        className="mr-1 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-600 py-2 px-4 font-small"
                        onClick={() => handleEditBtnClick(item._id)}>
                        Edit
                      </button>
                      <button
                      className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small"
                      onClick={() => handelDeleteCategory(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryModal />
    </div>
  )
}
