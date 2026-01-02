import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../api/api"
import { BlogCard } from "../components"
import { blogServices } from "../auth/service"

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await blogServices.getBlogs()
      setBlogs(res)
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#BDE8F5]">
        <div className="text-[#1C4D8D] font-semibold text-lg">
          Loading blogs...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#BDE8F5]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0F2854]">
            Latest Blogs
          </h1>
          <p className="text-[#1C4D8D] mt-2 max-w-2xl">
            Insights, stories, and updates from our writers
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            BlogCard({ blog })
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
