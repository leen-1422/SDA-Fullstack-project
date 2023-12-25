import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { addCategoryThunk } from '../../../redux/slices/categories/categoriesSlice'
import { AppDispatch } from '../../../redux/store'

export default function CategoryModal() {
  const [category, setCategory] = useState({ _id: '', name: '' })
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory((prevCategory) => {
      return { ...prevCategory, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      dispatch(addCategoryThunk(category))
      toast.success('New Category is added')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Create new category</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="product Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-purple-600 rounded-md hover:bg-purple-500 text-white ">Add Category</button>
          </div>

          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
            onClick={() => {
              const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null
              if (modal) {
                modal.close()
              }
            }}>
            ✕
          </button>
        </form>
      </div>
    </dialog>
  )
}
