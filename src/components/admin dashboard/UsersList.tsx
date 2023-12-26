import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ROLES } from '../../Constant'
import {
  Role,
  User,
  blockUserThunk,
  deleteUserThunk,
  getUsersThunk,
  grantRoleUserThunk
} from '../../redux/slices/users/usersSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function UsersList() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.users

  useEffect(() => {
    dispatch(getUsersThunk())
  }, [])

  const handelDeleteUser = (id: string) => {
    dispatch(deleteUserThunk(id))
  }

  const handelBlockUser = (id: string) => {
    dispatch(blockUserThunk(id))
  }

  const handleGrantRole = (e: ChangeEvent<HTMLSelectElement>, userId: User['_id']) => {
    const role = e.target.value as Role
    dispatch(grantRoleUserThunk({ role, userId }))
  }

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        {users.isLoading && <h3>Loading products...</h3>}
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Blocked</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.users.map((user) => (
                <tr className="text-gray-700">
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm border">{user.email}</td>
                  <td className="px-4 py-3 text-xs border">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight ${
                        user.isActive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      } rounded-sm`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm border">{user.role}</td>
                  <td className="px-4 py-3 text-xs border">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight ${
                        user.blocked ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'
                      } rounded-sm`}>
                      {user.blocked ? 'Blocked' : 'Unblocked'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <button
                      onClick={() => handelDeleteUser(user._id)}
                      className="text-white bg-purple-600 rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-gray active:bg-purple-600 py-2 px-4 font-small">
                      Delete
                    </button>
                    <button
                      onClick={() => handelBlockUser(user._id)}
                      className="mr-1 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline-gray active:bg-gray-600 py-2 px-4 font-small ml-4">
                      {user.blocked ? 'Unblock' : 'Block'}
                    </button>

                    <select
                      name="roles"
                      title="roles"
                      onChange={(e) => handleGrantRole(e, user._id)}>
                      <option>Select Role</option>
                      {Object.keys(ROLES).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
