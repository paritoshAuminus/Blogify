import React, { useEffect, useState } from "react"
import { IoIosCloudUpload } from "react-icons/io";
import { Editor } from '@tinymce/tinymce-react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogServices } from '../auth/service'

function AddBlog() {
    const { id } = useParams()

    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [blogImage, setBlogImage] = useState(null);
    const [body, setBody] = useState('');
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');

    const navigate = useNavigate();

    // populate the blog fields with data
    useEffect(() => {
        const handleEdit = async () => {
            if (id) {
                setEdit(true);
                const res = await blogServices.getBlog(id);
                setTitle(res.title);
                setBlogImage(res.image);
                setBody(res.body);
            }
        }
        handleEdit();
    }, [])

    const updateBlog = async (e) => {
        if (!title) {
            e.preventDefault()
            setTitleError('Title cannot be empty.')
            return null
        }
        setTitleError('')
        if (!body) {
            e.preventDefault()
            setBodyError('Body cannot be empty')
            return null
        }
        setBodyError('')
        
        if (id) {
            e.preventDefault()
            const result = await blogServices.updateBlog({ id: id, content: { title: title, image: image, body: body } });
            navigate('/my-blogs')
        } else {
            e.preventDefault()
            const result = await blogServices.addBlog({ title: title, image: image, body: body });
            navigate('/my-blogs')
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">

                {/* Page Title */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {edit ? "Edit Blog" : "Create New Blog"}
                </h1>

                {/* Form */}
                <form onSubmit={updateBlog} className="space-y-6">
                    {/* already existing image */}
                    <div className="flex justify-center items-center object-cover object-fit">
                        {blogImage &&
                            <img
                                src={blogImage}
                                alt="Preview image"
                                className="size-64" />}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {titleError && <p className="text-red-500 text-sm">{titleError}</p>}

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Image URL
                        </label>
                        <div className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-emerald-100">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="text-emerald-400 cursor-pointer hover:font-semibold"
                            />
                            <IoIosCloudUpload className="text-emerald-400" />
                        </div>
                    </div>

                    {/* Image Preview for previously uploaded image */}
                    <div className="border rounded-lg bg-gray-50 h-36 w-full md:h-48 md:w-96 flex items-center justify-center text-gray-400 text-sm">
                        {image !== null ?
                            <img
                                src={URL.createObjectURL(image)}
                                className="w-full h-full object-cover"
                            />
                            : "Image preview"
                        }
                    </div>


                    {/* Body */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Content
                        </label>
                        <Editor
                            apiKey='ok3femhgsts0hm5y14ohjxs1ye1thr1wzqwc1v08ewt3y7d7'
                            init={{
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            value={body}
                            onEditorChange={(content) => {
                                setBody(content);
                            }}
                        />
                    </div>

                    {/* Error */}
                    {bodyError && <p className="text-red-500 text-sm">{bodyError}</p>}

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Link to={'/my-blogs'}
                            type="reset"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 
                         hover:bg-gray-100 transition"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white 
                         hover:bg-blue-700 transition cursor-pointer"
                        >
                            {edit ? "Update Blog" : "Publish Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBlog
