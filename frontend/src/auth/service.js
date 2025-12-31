import BASE_URL from "../api/api"

//---------------------------------------------------
// BLOG SERVICES
//---------------------------------------------------

class BlogServices {

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
    async addBlog({ title, body }) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            })
            if (response.status === 400) {
                return new Error(response.statusText)
            }
            if (response.status === 201) {
                const result = await response.json()
                return result
            }
        } catch (error) {
            console.log("Services error :: addBlog ::", error)
        }
    }

    //-----------------------------------------------
    // Update blog (authenticated)
    //-----------------------------------------------
    async updateBlog({ id, content }) {
        try {

            const payload = {};

            if (content?.title) {
                payload.title = content?.title
            }

            if (content?.body) {
                payload.body = content?.body
            }

            const response = await fetch(`${BASE_URL}api/blogs/update/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                },
                body: JSON.stringify(payload)
            })
            const result = await response.json()
            if (response.status === 403) {
                return new Error(result.message)
            }
            if (response.status === 400) {
                return new Error(response.statusText)
            }
            if (response.status === 200) {
                return result
            }
        } catch (error) {
            console.log("Services error :: updateBlog ::", error)
        }
    }

    //-----------------------------------------------
    // Delete blog (authenticated)
    //-----------------------------------------------
    async deleteBlog(id) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                }
            })
            if (response.status === 404) {
                return new Error(response.statusText)
            }
            if (response.status === 403) {
                const result = await response.json()
                return new Error(result.message)
            }
            if (response.status === 204) {
                return 'Blog Deleted Successfully.'
            }
        } catch (error) {
            console.log("Services error :: deleteBlog ::", error)
        }
    }
}

//---------------------------------------------------
// COMMENT SERVICES
//---------------------------------------------------

class CommentServices {
    
    //-----------------------------------------------
    // Get comments (Public)
    //-----------------------------------------------
    async getComments(id) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${id}/comments/`, {
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
            console.log("Services error :: getComments ::", error)
        }
    }

    //-----------------------------------------------
    // Add comment (authenticated)
    //-----------------------------------------------
    async addComment({ blogId, content }) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${blogId}/comments/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                },
                body: JSON.stringify({
                    text: content
                })
            })
            if (response.status === 404) {
                return new Error(response.statusText)
            }
            if (response.status === 400) {
                return new Error(response.statusText)
            }
            if (response.status === 201) {
                const result = await response.json()
                return result
            }
        } catch (error) {
            console.log("Services error :: addComment ::", error)
        }
    }

    //-----------------------------------------------
    // Edit comment (authorized)
    //-----------------------------------------------
    async editComment({ blogId, commentId, content }) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${blogId}/comments/${commentId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                },
                body: JSON.stringify({
                    text: content
                })
            })
            const result = await response.json()

            if (response.status === 403) {
                return new Error(result.message)
            }
            if (response.status === 404) {
                return new Error(response.statusText)
            }
            if (response.status === 400) {
                return new Error(response.statusText)
            }
            if (response.status === 200) {
                return result
            }
        } catch (error) {
            console.log("Services error :: editComment ::", error)
        }
    }

    //-----------------------------------------------
    // Delete comment (authorized)
    //-----------------------------------------------
    async deleteComment({ blogId, commentId }) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${blogId}/comments/${commentId}/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                }
            })
            if (response.status === 404) {
                return new Error(response.statusText)
            }
            if (response.status === 403) {
                const result = await response.json()
                return new Error(result.message)
            }
            if (response.status === 204) {
                return 'Comment Deleted Successfully.'
            }
        } catch (error) {
            console.log("Services error :: deleteComment ::", error)
        }
    }
}

//---------------------------------------------------
// LIKES SERVICES
//---------------------------------------------------

class LikeServices {
    //-----------------------------------------------
    // Get likes (Public)
    //-----------------------------------------------
    async getLikes(id) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${id}/likes/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })
            const result = await response.json()

            if (response.status === 200) {
                return result
            } else {
                return new Error(response.statusText)
            }
        } catch (error) {
            console.log("Services error :: getLikes ::", error)
        }
    }

    //-----------------------------------------------
    // Toggle like (authenticated)
    //-----------------------------------------------
    async toggleLike(blogId) {
        try {
            const response = await fetch(`${BASE_URL}api/blogs/${blogId}/likes/toggle/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('blogifyAccess')}`
                }
            })
            // const result = await response.json()

            if (response.status === 404) {
                return new Error(response.statusText)
            }
            if (response.status === 400) {
                return new Error(response.statusText)
            }
            if (response.status === 201) {
                return response
            }
            if (response.status === 204) {
                return 'Like deleted'
            }
        } catch (error) {
            console.log("Services error :: toggleLike ::", error)
        }
    }
}

const blogServices = new BlogServices()
const commentServices = new CommentServices()
const likeServices = new LikeServices()
export { blogServices, commentServices, likeServices }