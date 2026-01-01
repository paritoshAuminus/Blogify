import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function Login() {

    const { handleSubmit, register } = useForm()

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
                <form className="space-y-5">
                    {/* Username / Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1C4D8D] text-white py-2 rounded-md
                       hover:bg-[#4988C4] transition font-medium"
                    >
                        Login
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
