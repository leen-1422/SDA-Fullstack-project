import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { RootState } from '../../redux/store'
import Login from '../homeComponents/Login'

const useAuth = () => {
  const { isLoggedIn, isAdmin, userData } = useSelector((state: RootState) => state.users)
  return isLoggedIn && isAdmin && userData
}
const AdminRoute = () => {
  const isAuth = useAuth()
  return <div>{isAuth ? <Outlet /> : <Login />}</div>
}

export default AdminRoute
