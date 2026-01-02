import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Page not found
        </p>

        <p className="mt-2 text-gray-500">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound