import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BASE_URL from "../api/api"
import { BlogCard } from "../components"
import { blogServices } from "../auth/service"
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

function Blogs() {
  const [blogs, setBlogs] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await blogServices.getBlogs()
      setBlogs(res)
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const onPageChange = async (url) => {
    const res = await blogServices.pageFetcher(url)
    setBlogs(res)
  }

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
          {blogs.results?.map(blog => (
            BlogCard({ blog })
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-4">
          {blogs.previous && (
            <button
              onClick={() => onPageChange(blogs.previous)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              <GrFormPreviousLink />
            </button>
          )}
          {blogs.next && (
            <button
              onClick={() => onPageChange(blogs.next)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              <GrFormNextLink />
            </button>
          )}
        </div>
      </div>
    </div>

  )
}

export default Blogs
