import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { login, logout } from './store/authSlice'
import authService from "./auth/auth";;
import { BlogDetail, Header, AddBlog } from "./components";
import { Route, Routes } from "react-router-dom";
import { Blogs, MyBlogs, Login, Signup, Home, Account, NotFound, EditProfile } from "./pages";
import ProtectedRoutes from './routes/ProtectedRoutes';

// step 1 - Check if there is a token available
// step 2 - If !token then login; if token then getUser

function App() {
  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  const authTasks = async () => {
    const access = localStorage.getItem('blogifyAccess')
    const refresh = localStorage.getItem('blogifyRefresh')

    if (!access && !refresh) {
      dispatch(logout())
      return null
    }

    const result = await authService.getUser()
    dispatch(login({ user: { id: result.id, username: result.username, email: result.email } }))
  }

  useEffect(() => {
    if (status === 'idle') {
      authTasks()
    }
  }, [status])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route
          path="/my-blogs"
          element={
            <ProtectedRoutes>
              <MyBlogs />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-blog"
          element={
            <ProtectedRoutes>
              <AddBlog />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoutes>
              <AddBlog />
            </ProtectedRoutes>
          } />
        <Route path="/account" element={
          <ProtectedRoutes>
            <Account />
          </ProtectedRoutes>
        } />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoutes>
              <EditProfile />
            </ProtectedRoutes>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
