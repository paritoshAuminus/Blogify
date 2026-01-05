import Header from "./Header";
import BlogDetail from "./BlogDetail";
import BlogCard from "./BlogCard";
import AddBlog from "./AddBlog";
import DeletePopup from "./DeletePopup";

export const handleDelete = async () => {
    // await blogServices.deleteBlog(id)
    window.location.href = "/blogs"
}

export { Header, BlogDetail, BlogCard, AddBlog, DeletePopup };