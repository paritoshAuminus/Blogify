import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({ blog }) {
    return (
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
    )
}

export default BlogCard