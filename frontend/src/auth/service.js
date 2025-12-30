import BASE_URL from "../api/api"

const token = localStorage.getItem('blogifyAccess')
//---------------------------------------------------
// BLOG SERVICES
//---------------------------------------------------

class Services {

    //-----------------------------------------------
    // Get Blogs (Public)
    //-----------------------------------------------
    async getBlogs() {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
            
            if (response.status === 200) {
                const result = await response.json()
                return result
            } else {
                return new Error(response.statusText)
            }
        } catch (error) {
            console.log("Services error :: getBlogs ::", error)
        }
    }


    //-----------------------------------------------
    // Get Blogs (Public)
    //-----------------------------------------------
    async getBlog(id) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })

            if (response.status === 200) {
                const result = await response.json()
                return result
            } else {
                return new Error(response.statusText)
            }
        } catch (error) {
            console.log("Services error :: getBlog ::", error)
        }
    }

    //-----------------------------------------------
    // Add blog (authenticated)
    //-----------------------------------------------
    async addBlog(){
        try {
            const response = await fetch(`${BASE_URL}api/blogs/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                }
            })
        } catch (error) {
            
        } 
    }
}

const services = new Services()
export default services