import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import logo from '../assets/Logo.png'
import { TiHome } from "react-icons/ti";
import { IoNewspaper } from "react-icons/io5";
import { FaFolderOpen, FaUser } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { login, logout } from "../store/authSlice";
import { useEffect } from "react";
import authService from "../auth/auth";

function Header() {
  const status = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    const hydrateAuth = async () => {

      const access = localStorage.getItem("blogifyAccess")
      const refresh = localStorage.getItem("blogifyRefresh")

      if (!access && !refresh) {
        dispatch(logout())
        return
      }

      const user = await authService.getUser()

      if (user) {
        dispatch(login({ user }))
      } else {
        dispatch(logout())
      }
    }

    hydrateAuth()
  }, [])


  return (
    <header className="bg-[#0F2854] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 bg-[#BDE8F5] px-2 py-1 rounded-md">
          <img src={logo} alt="Blogify" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-1 text-xs text-white/90 
               hover:text-[#BDE8F5] transition-colors"
          >
            <TiHome className="text-lg" />
            <span>Home</span>
          </Link>

          <Link
            to="/blogs"
            className="flex items-center gap-2 px-2 py-1 text-xs text-white/90 
               hover:text-[#BDE8F5] transition-colors"
          >
            <IoNewspaper className="text-lg" />
            <span>Blogs</span>
          </Link>

          {status === 'authenticated' && (
            <Link
              to="/my-blogs"
              className="flex items-center gap-2 px-2 py-1 text-xs text-white/90 
                 hover:text-[#BDE8F5] transition-colors"
            >
              <FaFolderOpen className="text-lg" />
              <span>My Blogs</span>
            </Link>
          )}
        </nav>


        {/* Auth actions */}
        <div>
          {status === 'authenticated' ? (
            <Link
              to="/account"
              className="flex items-center gap-2 bg-[#1C4D8D] 
                 px-4 py-2 rounded-md text-xs text-white
                 hover:bg-[#4988C4] transition-colors"
            >
              <FaUser className="text-base" />
              <span>Account</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-[#4988C4] 
                 px-4 py-2 rounded-md text-xs text-white
                 hover:bg-[#1C4D8D] transition-colors"
            >
              <MdLogin className="text-base" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
