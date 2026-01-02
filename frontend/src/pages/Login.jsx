import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import authService from '../auth/auth'
import { useSelector } from "react-redux";

function Login() {

    const status = useSelector(state => state.auth.status);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm()

    const navigate = useNavigate()

    const submitform = async (data) => {
        const res = await authService.login({ username: data.username, password: data.password })
        if (res) {
            navigate('/')
        }
    }

    if (status === 'authenticated') {
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
                        Welcome back
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Sign in to continue to Blogify
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(submitform)} className="space-y-5">
                    {/* Username / Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Username
                        </label>
                        <input
                            {...register("username", { required: 'Username is required' })}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                        {errors.username && <p className="text-sm text-red-500 font-semibold">{errors.username?.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Password
                        </label>
                        <input
                            {...register("password", { required: 'Password is required' })}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                        {errors.password && <p className="text-sm text-red-500 font-semibold">{errors.password?.message}</p>}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1C4D8D] text-white py-2 rounded-md
                       hover:bg-[#4988C4] transition font-medium"
                    >
                        {isSubmitting ? 'Logging in' : 'Login'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-[#1C4D8D] font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login
