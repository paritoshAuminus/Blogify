import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaPen, FaTrash } from "react-icons/fa"
import { blogServices } from "../auth/service"

function MyBlogs() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMyBlogs = async () => {
            const res = await blogServices.getMyBlogs()
            setBlogs(res)
            setLoading(false)
        }

        fetchMyBlogs()
    }, [])

    if (loading) {
        return <div className="p-6 text-gray-600">Loading your blogs...</div>
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#0F2854]">
                    My Blogs
                </h1>

                <Link
                    to="/create-blog"
                    className="bg-[#1C4D8D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#4988C4]"
                >
                    Write New
                </Link>
            </div>

            {/* Empty state */}
            {blogs.length === 0 && (
                <p className="text-gray-500">
                    You haven't written any blogs yet.
                </p>
            )}

            {/* Blog list */}
            <div className="space-y-6">
                {blogs.map(blog => (
                    <div
                        key={blog.id}
                        className="border rounded-lg p-5 flex gap-6 hover:shadow-sm transition"
                    >
                        {/* Image */}
                        {blog.image && (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-40 h-28 object-cover rounded-md"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1">
                            <Link
                                to={`/blogs/${blog.id}`}
                                className="text-lg font-semibold text-[#0F2854] hover:underline"
                            >
                                {blog.title}
                            </Link>

                            <p className="text-sm text-gray-500 mt-1">
                                {new Date(blog.created_at).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                            <p className="text-gray-700 mt-3 line-clamp-2">
                                {blog.body}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-4 mt-4 text-sm">
                                <button className="flex items-center gap-2 text-[#1C4D8D] hover:text-[#4988C4] cursor-pointer">
                                    <FaPen />
                                    Edit
                                </button>

                                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer">
                                    <FaTrash />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBlogs
