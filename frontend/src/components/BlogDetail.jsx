import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MdOutlineComment } from "react-icons/md"
import { IoMdThumbsUp } from "react-icons/io"
import { FaComments } from "react-icons/fa"
import { useSelector } from "react-redux"
import { blogServices, commentServices, likeServices } from "../auth/service"

function BlogDetail() {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [commentLoading, setCommentLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [addCommentLoading, setAddCommentLoading] = useState(false)
    const [commentText, setCommentText] = useState('')

    const status = useSelector(state => state.auth.status);

    const handleLike = async () => {
        await likeServices.toggleLike(id)
        const res = await blogServices.getBlog(id)
        setBlog(res)
    }

    const handleComment = async (e) => {
        const res = await commentServices.addComment({blogId: id, content: commentText})
        const commentRes = await commentServices.getComments(id)
        setComments(commentRes)
        setAddCommentLoading(false)
    }

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await blogServices.getBlog(id)
            setBlog(res)
            setLoading(false)
        }
        fetchBlog()
    }, [id])

    useEffect(() => {
        const fetchComments = async () => {
            const res = await commentServices.getComments(id)
            setComments(res)
            setCommentLoading(false)
        }
        fetchComments()
    }, [id])

    if (loading) return <div className="p-6">Loading blog...</div>
    if (!blog) return <div className="p-6">Blog not found</div>

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}

            <div className="flex justify-between items-start gap-4 mb-2">
                <h1 className="text-3xl font-bold text-[#0F2854]">
                    {blog.title}
                </h1>

                <button
                    disabled={!status}
                    onClick={handleLike}
                    className={`flex items-center gap-2 text-gray-700 transition
                ${status ? 'hover:text-blue-600 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                `}
                >
                    <IoMdThumbsUp size={22} />
                    <span className="text-sm">{blog.likes_count}</span>
                </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                {`By ${blog.author_username} on 
                ${new Date(blog.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })}`}
            </p>


            <article className="prose max-w-none">
                {blog.body}
            </article>

            {/* Spacer so content doesn't hide behind fixed bar */}
            <div className="h-20"></div>

            {/* Comments Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-[#0F2854]">
                    Comments ({blog.comment_count})
                </h2>
                <div>
                    {commentLoading && <p className="text-gray-500 flex gap-3 items-center"><FaComments /> Loading comments...</p>}
                    {/* Empty state */}
                    {(!comments || blog.comment_count === 0) ? (
                        <p className="text-gray-500 flex gap-3 items-center"><FaComments /> No comments yet...</p>
                    ) :
                        (
                            comments.map(comment => (
                                <div
                                    key={comment.id}
                                    className="mb-6 border-b pb-4 last:border-b-0"
                                >
                                    {/* Author + date */}
                                    <div className="flex items-center gap-3 text-sm mb-1">
                                        <span className="font-semibold text-[#0F2854]">
                                            {comment.username}
                                        </span>
                                        <span className="text-gray-400 text-xs">
                                            {new Date(comment.created_at).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    {/* Comment text */}
                                    <p className="text-gray-700 text-sm flex gap-2 items-start leading-relaxed">
                                        <MdOutlineComment className="mt-0.5 text-[#4988C4]" />
                                        <span>{comment.text}</span>
                                    </p>
                                </div>
                            ))
                        )}

                    {/* Comments list (UI only for now) */}
                    {/* Comments Header */}
                    <div className="mt-12 mb-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#0F2854]">
                            Add a comment
                        </h2>

                        {!status && (
                            <span className="text-sm text-gray-500">
                                Login to comment
                            </span>
                        )}
                    </div>
                </div>

                {/* Comment Input */}
                <form
                    className="mb-6">
                    <textarea
                        disabled={!status}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={
                            status ? "Write a comment..." : "Login to write a comment"
                        }
                        className={`w-full border rounded-md p-3 resize-none text-sm focus:outline-none
                            ${status
                                ? "focus:ring-2 focus:ring-[#4988C4]"
                                : "bg-gray-100 cursor-not-allowed"}
                            `}
                        rows={3}
                    />

                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            disabled={!status || addCommentLoading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm
                                    ${status
                                    ? "bg-[#1C4D8D] text-white hover:bg-[#4988C4] cursor-pointer"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"}
                                    `}
                        >
                            <MdOutlineComment size={18} />
                            {addCommentLoading ? "Commenting..." : "Comment"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default BlogDetail
