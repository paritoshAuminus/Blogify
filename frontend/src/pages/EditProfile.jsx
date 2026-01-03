import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function EditProfile() {

    const navigate = useNavigate()
    const status = useSelector(state => state.auth.status)
    const user = useSelector(state => state.auth.user)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const [username, setUsername] = useState(user?.username)
    const [email, setEmail] = useState(user?.email)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username === '' || email === '') {
            setError("All fields are required")
            console.log(error)
            return
        }
        setError(null)
    }

    if (status === "unauthenticated") {
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">

                {/* Page Title */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Edit Profile
                </h1>

                {/* Profile Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        Avatar
                    </div>

                    <div>
                        <h2 className="text-lg font-medium text-gray-800">
                            Profile Picture
                        </h2>
                        <p className="text-sm text-gray-500">
                            Upload a profile photo to personalize your account
                        </p>

                        <div className="flex gap-3 mt-3">
                            <button
                                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white
                           hover:bg-blue-700 transition"
                            >
                                Upload
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded-md border border-gray-300
                           text-gray-700 hover:bg-gray-100 transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                onSubmit={handleSubmit}
                 className="space-y-6">

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        {error !== null && <p className="text-red-500">{error}</p>}
                    </div>

                    {/* Divider */}
                    <div className="border-t pt-6"></div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700
                         hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white
                         hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProfile
