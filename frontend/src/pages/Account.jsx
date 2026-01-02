import { FaUserCircle } from "react-icons/fa"
import { logout } from "../store/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Account() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-[#BDE8F5] flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-6">
                    <FaUserCircle size={72} className="text-[#4988C4] mb-3" />
                    <h1 className="text-2xl font-semibold text-[#0F2854]">
                        My Account
                    </h1>
                </div>

                {/* User Info */}
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Username</span>
                        <span className="text-[#1C4D8D] font-medium">
                            {user.username || 'No username'}
                        </span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500 text-sm">Email</span>
                        <span className="text-[#1C4D8D] font-medium">
                            {user.email || 'No email'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        className="w-full bg-[#1C4D8D] text-white py-2 rounded-md
                       hover:bg-[#4988C4] transition font-medium curosor-pointer"
                    >
                        Edit Profile
                    </button>

                    <button onClick={handleLogout}
                        className="w-full border border-red-500 text-red-500 py-2 rounded-md
                       hover:bg-red-500 hover:text-white transition font-medium cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Account
