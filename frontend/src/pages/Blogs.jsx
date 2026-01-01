import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../api/api"
import { BlogCard } from "../components"

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
          BlogCard({ blog })
        ))}
      </div>
    </div>
  )
}

export default Blogs
