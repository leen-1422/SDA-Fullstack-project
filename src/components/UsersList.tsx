import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import {removeUser, usersRequest, usersSuccess} from '../redux/slices/usersSlice'

export default function UsersList() {
    const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const users = state.users
  



  useEffect(() => {
    handleGetUsers()
  }, [])
  const handleGetUsers = async () => {
    dispatch(usersRequest())

    const res = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(res.data))
  }


  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">



{users.isLoading && <h3> Loading products...</h3>}
<div className="card grid gap-4">
  <ul>
    {users.users.map((users) => (
      <li key={users.id} className="flex items-center gap-4 text-2xl mb-2">
        
        <span>{users.firstName}</span>
        <button
          className=" text-red-400 text-xs"
          onClick={() => dispatch(removeUser({ userId: users.id }))}>
          X
        </button>

      </li>
    ))}
  </ul>
</div>
</div>

    </div>
  )
}
