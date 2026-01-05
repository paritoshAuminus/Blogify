import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import authService from "../auth/auth";
import { login } from "../store/authSlice";

function Signup() {
    const status = useSelector(state => state.auth.status);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const handleSingup = async (data) => {
        const result = await authService.register({
            "username": data.username,
            "email": data.email,
            "password": data.password
        })
        const { loginResult, getUserResult } = await authService.login({ username: data.username, password: data.password })

        if (getUserResult) {
            dispatch(login({ user: { username: getUserResult.username, email: getUserResult.email } }))
            navigate('/')
        }
    }

    if (status === "authenticated") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#BDE8F5] px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-6 flex flex-col items-center text-center gap-2">
                        <h1 className="text-2xl font-bold text-[#0F2854]">
                            Welcome back
                        </h1>

                        <p className="text-sm text-gray-600">
                            You are already logged in
                        </p>
                        <Link
                            to="/"
                            className="mt-3 inline-block bg-[#1C4D8D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#4988C4] transition-colors"
                        >
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#BDE8F5] px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#0F2854]">
                        Create an account
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Join Blogify and start writing
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleSingup)}
                    className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            {...register("username", { required: 'Username is required' })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: 'Email is required', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            {...register("password", { required: 'Password is required' })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password.message}</p>}
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1C4D8D] text-white py-2 rounded-md
                       hover:bg-[#4988C4] transition font-medium"
                    >
                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#1C4D8D] font-medium hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
