import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaPen, FaTrash } from "react-icons/fa"
import { blogServices } from "../auth/service"
import BASE_URL from "../api/api"
import DeletePopup from "../components/DeletePopup"

export const handleDelete = async (id) => {

    const navigate = useNavigate()

    const result = await blogServices.deleteBlog(id)
    console.log(result)
    // window.location.href = "/blogs"
    navigate('/blogs')
}

function MyBlogs() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    const [deleteOpen, setDeleteOpen] = useState(false)

    useEffect(() => {
        const fetchMyBlogs = async () => {
            const res = await blogServices.getMyBlogs()
            setBlogs(res)
            setLoading(false)
        }

        fetchMyBlogs()
    }, [])

    const onPageChange = async (url) => {
        const res = await blogServices.pageFetcher(url)
        setBlogs(res)
    }

    if (loading) {
        return (
            <div className="p-6 text-[#1C4D8D] font-medium">
                Loading your blogs...
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-[#0F2854]">My Blogs</h1>

                <Link
                    to="/create-blog"
                    className="bg-[#1C4D8D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#4988C4] transition"
                >
                    Write New
                </Link>
            </div>

            {/* Empty state */}
            {blogs.results?.length === 0 && (
                <p className="text-[#0F2854]/60">
                    You haven't written any blogs yet.
                </p>
            )}

            {/* Blog list */}
            <div className="space-y-6">
                {blogs.results?.map(blog => (
                    <div
                        key={blog.id}
                        className="border border-[#4988C4]/30 rounded-lg p-5 flex gap-6 hover:shadow-md transition bg-white"
                    >
                        {/* Image */}
                        {blog.image && (
                            <img
                                src={`${BASE_URL}${blog.image}`}
                                alt={blog.title}
                                className="w-40 h-28 object-cover rounded-md"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1">
                            <Link
                                to={`/blogs/${blog.id}`}
                                className="text-lg font-semibold text-[#0F2854] hover:text-[#1C4D8D] transition hover:underline"
                            >
                                {blog.title}
                            </Link>

                            <p className="text-sm text-[#4988C4] mt-1">
                                {new Date(blog.created_at).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                            <p
                                dangerouslySetInnerHTML={{ __html: blog.body }}
                                className="text-[#0F2854]/70 mt-3 line-clamp-2"
                            ></p>

                            {/* Actions */}
                            <div className="flex gap-6 mt-4 text-sm">
                                <Link
                                    to={`/edit-blog/${blog.id}`}
                                    className="flex items-center gap-2 text-[#1C4D8D] hover:text-[#4988C4] cursor-pointer transition"
                                >
                                    <FaPen />
                                    Edit
                                </Link>

                                <button
                                    onClick={() => setDeleteOpen(true)}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer transition"
                                >
                                    Delete
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        <DeletePopup
                            isOpen={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            onConfirm={handleDelete}
                            id={blog.id}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-4">
                {blogs.previous && (
                    <button
                        onClick={() => onPageChange(blogs.previous)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Previous
                    </button>
                )}
                {blogs.next && (
                    <button
                        onClick={() => onPageChange(blogs.next)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyBlogs
