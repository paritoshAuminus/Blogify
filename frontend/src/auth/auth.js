import BASE_URL from "../api/api";

// -------------------------------------------------
//  AUTH SERVICES 
// -------------------------------------------------

class AuthService {
    // ------------------------------------------------
    // Register
    // ------------------------------------------------
    async register({username, email, password}) {
        try {
            const response = await fetch(`${BASE_URL}auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            const result = await response.json()
            await this.login({username: username, password: password})
            return result
        } catch (error) {
            console.log("AuthService error :: register ::", error)
        }
    }
    
    // ------------------------------------------------
    // Login
    // ------------------------------------------------
    async login({username, password}) {
        try {
            const response = await fetch(`${BASE_URL}auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const result = await response.json()
            localStorage.setItem('blogifyAccess', result.access)
            localStorage.setItem('blogifyRefresh', result.refresh)
            return result
        } catch (error) {
            console.log("AuthService error :: login ::", error)
        }
    }

    // ------------------------------------------------
    // Get User
    // ------------------------------------------------
    async getUser() {
        const token = localStorage.getItem('blogifyAccess')
        if (!token) return null
        try {
            const response = await fetch(`${BASE_URL}auth/getuser/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const result = await response.json()
            return result
        } catch (error) {
            console.log("AuthService error :: getUser ::", error)
        }
    }

    // ------------------------------------------------
    // Refresh Token
    // ------------------------------------------------
    async refreshToken() {
        try {
            const response = await fetch(`${BASE_URL}auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    refresh: localStorage.getItem('blogifyRefresh')
                })
            })
            const result = await response.json()
            localStorage.setItem('blogifyAccess', result.access)
            localStorage.setItem('blogifyRefresh', result.refresh)
            return result
        } catch (error) {
            console.log("AuthService error :: refreshToken ::", error)
        }
    }

    // ------------------------------------------------
    // Logout
    // ------------------------------------------------
    async logout() {
        localStorage.removeItem('blogifyAccess')
        localStorage.removeItem('blogifyRefresh')
    }
}

const authService = new AuthService()
export default authService;