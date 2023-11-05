import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'

export default function Navbar() {
  const { isLoggedIn, isAdmin, userData } = useSelector((state: RootState) => state.users)

  return (
    <div className="header">
      <nav className="w-full py-6 bg-white w-screen">
        <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
          <section className="flex items-center text-gray-900 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"></svg>
            <h2 className="text-sm title-font text-gray-900 tracking-widest">
              <svg
                className="h-8 w-8 text-green-900"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <rect x="4" y="3" width="8" height="14" rx="4" />{' '}
                <rect x="12" y="7" width="8" height="10" rx="3" />{' '}
                <line x1="8" y1="21" x2="8" y2="13" /> <line x1="16" y1="21" x2="16" y2="14" />
              </svg>
            </h2>
            <a className="font-bold text-xl focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
              Geranium
            </a>
          </section>
          <section>
            <ul className="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
              {isLoggedIn && (
                <>
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <Link
                      to={`/${userData?.role}`}
                      className="group focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      {userData?.firstName}
                    </Link>
                  </div>
                </>
              )}
              {!isAdmin && (
                <>
                  <li className="relative group">
                    <Link
                      to="/"
                      className="group focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      {' '}
                      Home{' '}
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>
                  <li className="relative group">
                    <Link
                      to="/about"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      About
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>

                  <li className="relative group">
                    <Link
                      to="/cart"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="bg-purple-500 px-4 py-1 rounded-xl text-white hover:bg-purple-400 active:bg-purple-600 focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none">
                      Login
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && isAdmin && (
                <>
                  <li className="relative group">
                    <Link
                      to="/admin"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      Products
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>

                  <li className="relative group">
                    <Link
                      to="/users"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      Users
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>
                  <li className="relative group">
                    <Link
                      to="/orders"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      Orders
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>

                  <li className="relative group">
                    <Link
                      to="/categories"
                      className="focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none rounded-lg">
                      Categories
                    </Link>
                    <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
                  </li>
                </>
              )}
            </ul>
            <button className="flex md:hidden hover:bg-gray-100 p-2 rounded-full transition-all focus:ring focus:ring-purple-500 focus:ring-opacity-25 active:bg-gray-200 outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </section>
        </div>
      </nav>
    </div>
  )
}
