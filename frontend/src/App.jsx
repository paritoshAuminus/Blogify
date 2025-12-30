import { useDispatch, useSelector } from "react-redux"
import BASE_URL from "./api/api"
import { useEffect } from "react"
import { login, logout } from './store/authSlice'
import authService from "./auth/auth";

// step 1 - Check if there is a token available
// step 2 - If !token then login; if token then getUser

function App() {

  const status = useSelector(state => state.auth.status);
  const dispatch = useDispatch();

  const authTasks = async () => {
    const token = localStorage.getItem('blogifyAccess')
    if (!token) {
      await authService.refreshToken()
    }
    const result = await authService.getUser()
    if (result.user) {
      dispatch(login({ user: result.user }))
    }
  }

  useEffect(() => {
    if (state === 'idle') {
      authTasks()
    }
  }, [])


  return (
    <>
    </>
  )
}

export default App
