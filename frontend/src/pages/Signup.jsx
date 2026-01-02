import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function Signup() {
    const status = useSelector(state => state.auth.status);

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
                <form className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
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
                            placeholder="Create a password"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#0F2854] mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 rounded-md border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-[#4988C4]
                         focus:border-[#4988C4]"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1C4D8D] text-white py-2 rounded-md
                       hover:bg-[#4988C4] transition font-medium"
                    >
                        Sign Up
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
