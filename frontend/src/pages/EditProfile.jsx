import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import authService from "../auth/auth"
import { login } from "../store/authSlice"

function EditProfile() {

    const navigate = useNavigate()
    const status = useSelector(state => state.auth.status)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm({
        defaultValues: {
            username: user.username,
            email: user.email
        }
    })

    const submit = async (data) => {
        const result = await authService.updateUser({ id: user.id, username: data.username, email: data.email })
        dispatch(login({ user: { id: result.id, username: result.username, email: result.email } }))
        navigate('/account')
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
                            {user?.username}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Upload a profile photo to personalize your account
                        </p>

                        <div className="flex gap-3 mt-3">
                            <button
                                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white
                           hover:bg-blue-700 transition cursor-not-allowed"
                            >
                                Upload
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded-md border border-gray-300
                           text-gray-700 hover:bg-gray-100 transition cursor-not-allowed"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(submit)}
                    className="space-y-6">

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: 'This field cannot be empty.'
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.username && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'This field cannot be empty.'
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        {...field}
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </div>

                    {/* Divider */}
                    <div className="border-t pt-6"></div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Link
                            to="/account"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700
                         hover:bg-gray-100 transition cursor-pointer"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white
                         hover:bg-blue-700 transition cursor-pointer"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditProfile
