import { useDispatch, useSelector } from "react-redux"
import BASE_URL from "./api/api"
import { useEffect } from "react"
import { login, logout } from './store/authSlice'
import authService from "./auth/auth";
import services from "./auth/service";

// step 1 - Check if there is a token available
// step 2 - If !token then login; if token then getUser

function App() {

  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  // const authTasks = async () => {
  //   const access = localStorage.getItem('blogifyAccess')
  //   const refresh = localStorage.getItem('blogifyRefresh')
  //   if (!access && !refresh) {
  //     dispatch(logout())
  //     return
  //   }

  //   const result = await authService.getUser()
  //   dispatch(login({ user: {username: result.username, email: result.email} }))
  // }

  // useEffect(() => {
  //   if (status === 'idle') {
  //     authTasks()
  //   }
  // }, [status])

  const getBlog = async () => {
    
  }

  useEffect(() => {
    getBlog()
  }, [])

  return (
    <>
    <div>
      <button className="flex justify-center items-center hover:cursor-pointer text-2xl text-amber-100 bg-amber-500 rounded-xl m-2 p-2">Signup</button>
    </div>
    </>
  )
}

export default App
