import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../api/api"

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${BASE_URL}api/blogs/`)
      const data = await res.json()
      setBlogs(data)
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  if (loading) return <div className="p-6">Loading blogs...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-[#0F2854]">
        Latest Blogs
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="font-semibold text-[#1C4D8D] line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-xs text-gray-500 mt-2">
                By {blog.author} on {new Date(blog.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Blogs
