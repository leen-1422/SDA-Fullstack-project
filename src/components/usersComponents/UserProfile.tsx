import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api'
import { updateUser, usersRequest, usersSuccess } from '../../redux/slices/users/usersSlice'
import { RootState } from '../../redux/store'

export default function UserProfile() {
  const { isLoggedIn, isAdmin, userData, users } = useSelector((state: RootState) => state.users)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState({ firstName: '', lastName: '' })
  const dispatch = useDispatch()

  useEffect(() => {
    handleGetUsers()
    if (userData) {
      setUser({ firstName: userData.firstName, lastName: userData.lastName })
    }
  }, [userData])

  const handleGetUsers = async () => {
    dispatch(usersRequest())

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
  }

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const updateUserData = { id: userData?._id, ...user }
    dispatch(updateUser(updateUserData))
  }

  return (
    <div style={{ backgroundColor: '' }}>
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {userData?.firstName} {userData?.lastName}{' '}
          <button
            onClick={handleFormOpen}
            type="button"
            className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Edit
          </button>{' '}
        </h2>

        <p className="text-center text-gray-600 mt-1">{userData?.email}</p>

        <div className="flex justify-center mt-5"></div>

        {isFormOpen && (
          <form className="w-full max-w-lg flex" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name">
                  First Name
                </label>
                <input
                  value={user.firstName}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name="firstName"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name">
                  Last Name
                </label>
                <input
                  value={user.lastName}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 ml-5">
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
