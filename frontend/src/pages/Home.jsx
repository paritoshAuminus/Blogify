import { Link } from "react-router-dom"
import { IoNewspaper } from "react-icons/io5"
import { FaPenNib, FaComments } from "react-icons/fa"

function Home() {
  return (
    <div className="bg-[#BDE8F5] min-h-screen">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F2854] mb-6">
          Write. Share. Engage.
        </h1>

        <p className="text-lg text-[#1C4D8D] max-w-2xl mx-auto mb-8">
          Blogify is a modern blogging platform where ideas meet discussion.
          Write blogs, like posts, and engage through meaningful comments.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/blogs"
            className="bg-[#1C4D8D] text-white px-6 py-3 rounded-md
                       hover:bg-[#4988C4] transition font-medium"
          >
            Explore Blogs
          </Link>

          <Link
            to="/signup"
            className="border border-[#1C4D8D] text-[#1C4D8D]
                       px-6 py-3 rounded-md hover:bg-[#1C4D8D]
                       hover:text-white transition font-medium"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div className="text-center">
            <IoNewspaper size={40} className="mx-auto text-[#4988C4] mb-4" />
            <h3 className="text-xl font-semibold text-[#0F2854] mb-2">
              Read Blogs
            </h3>
            <p className="text-gray-600 text-sm">
              Discover blogs written by people with diverse ideas and perspectives.
            </p>
          </div>

          <div className="text-center">
            <FaPenNib size={40} className="mx-auto text-[#4988C4] mb-4" />
            <h3 className="text-xl font-semibold text-[#0F2854] mb-2">
              Write Freely
            </h3>
            <p className="text-gray-600 text-sm">
              Create and manage your own blogs with full control and ownership.
            </p>
          </div>

          <div className="text-center">
            <FaComments size={40} className="mx-auto text-[#4988C4] mb-4" />
            <h3 className="text-xl font-semibold text-[#0F2854] mb-2">
              Engage
            </h3>
            <p className="text-gray-600 text-sm">
              Like posts and participate in discussions through comments.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-[#0F2854] mb-4">
          Ready to start writing?
        </h2>

        <p className="text-[#1C4D8D] mb-8">
          Create an account and publish your first blog today.
        </p>

        <Link
          to="/signup"
          className="bg-[#4988C4] text-white px-8 py-3 rounded-md
                     hover:opacity-90 transition font-medium"
        >
          Join Blogify
        </Link>
      </section>

    </div>
  )
}

export default Home
