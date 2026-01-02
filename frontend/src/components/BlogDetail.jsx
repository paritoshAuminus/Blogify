import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MdOutlineComment } from "react-icons/md"
import { IoMdThumbsUp } from "react-icons/io"
import { FaComments } from "react-icons/fa"
import { useSelector } from "react-redux"
import { blogServices, commentServices, likeServices } from "../auth/service"
import { useForm } from "react-hook-form"

function BlogDetail() {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [commentLoading, setCommentLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [addCommentLoading, setAddCommentLoading] = useState(false)

    const status = useSelector(state => state.auth.status)

    const handleLike = async () => {
        await likeServices.toggleLike(id)
        const res = await blogServices.getBlog(id)
        setBlog(res)
    }

    const handleComment = async (data) => {
        await commentServices.addComment({ blogId: id, content: data.text })
        const commentRes = await commentServices.getComments(id)
        setComments(commentRes)
        reset()
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#BDE8F5]">
                <p className="text-[#1C4D8D] font-medium">
                    Loading blog...
                </p>
            </div>
        )
    }

    if (!blog) {
        return <div className="p-6">Blog not found</div>
    }

    return (
        <div className="min-h-screen bg-[#BDE8F5] py-10">
            <div className="max-w-3xl mx-auto px-4">
                {/* Image */}
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-64 object-cover rounded-xl mb-8 shadow-sm"
                    />
                )}

                {/* Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <div className="flex justify-between items-start gap-4 mb-3">
                        <h1 className="text-3xl font-bold text-[#0F2854] leading-tight">
                            {blog.title}
                        </h1>

                        <button
                            disabled={!status}
                            onClick={handleLike}
                            className={`
                                flex items-center gap-2 text-sm font-medium
                                transition
                                ${status === "authenticated"
                                    ? "text-[#1C4D8D] hover:text-[#4988C4] cursor-pointer"
                                    : "opacity-50 cursor-not-allowed"}
                            `}
                        >
                            <IoMdThumbsUp size={22} />
                            {blog.likes_count}
                        </button>
                    </div>

                    <p className="text-sm text-[#4988C4]">
                        By <span className="font-medium">{blog.author_username}</span>{" "}
                        on{" "}
                        {new Date(blog.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>

                {/* Body */}
                <article className="bg-white rounded-xl p-6 shadow-sm prose max-w-none">
                    {blog.body}
                </article>

                {/* Spacer */}
                <div className="h-16"></div>

                {/* Comments */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-[#0F2854]">
                        Comments ({blog.comment_count})
                    </h2>

                    {commentLoading && (
                        <p className="text-[#1C4D8D] flex gap-2 items-center text-sm">
                            <FaComments /> Loading comments...
                        </p>
                    )}

                    {(!comments || blog.comment_count === 0) && !commentLoading && (
                        <p className="text-[#1C4D8D] flex gap-2 items-center text-sm">
                            <FaComments /> No comments yet...
                        </p>
                    )}

                    {comments.map(comment => (
                        <div
                            key={comment.id}
                            className="border-b border-[#4988C4]/30 py-4 last:border-b-0"
                        >
                            <div className="flex items-center gap-3 text-sm mb-1">
                                <span className="font-semibold text-[#0F2854]">
                                    {comment.username}
                                </span>
                                <span className="text-xs text-[#4988C4]">
                                    {new Date(comment.created_at).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                            <p className="text-sm text-[#0F2854]/80 flex gap-2 items-start">
                                <MdOutlineComment className="mt-0.5 text-[#4988C4]" />
                                {comment.text}
                            </p>
                        </div>
                    ))}

                    {/* Add comment header */}
                    <div className="mt-10 mb-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-[#0F2854]">
                            Add a comment
                        </h3>

                        {!status && (
                            <span className="text-sm text-[#1C4D8D]">
                                Login to comment
                            </span>
                        )}
                    </div>

                    {/* Comment form */}
                    <form onSubmit={handleSubmit(handleComment)}>
                        <textarea
                            disabled={status !== "authenticated"}
                            {...register("text", { required: "Comment cannot be empty" })}
                            placeholder={
                                status === "authenticated"
                                    ? "Write a comment..."
                                    : "Login to write a comment"
                            }
                            rows={3}
                            className={`
                                w-full border border-[#4988C4]/40 rounded-md p-3
                                text-sm resize-none
                                focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                                ${status !== "authenticated" && "bg-gray-100 cursor-not-allowed"}
                            `}
                        />

                        {errors.text?.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.text.message}
                            </p>
                        )}

                        <div className="flex justify-end mt-3">
                            <button
                                type="submit"
                                disabled={status !== "authenticated" || addCommentLoading}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-md text-sm
                                    transition
                                    ${status === "authenticated"
                                        ? "bg-[#1C4D8D] text-white hover:bg-[#4988C4]"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"}
                                `}
                            >
                                <MdOutlineComment size={18} />
                                {isSubmitting ? "Commenting..." : "Comment"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail
