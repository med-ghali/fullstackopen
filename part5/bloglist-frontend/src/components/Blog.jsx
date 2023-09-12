import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }
  const toggleVisibilty = () => setVisible(!visible)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => {
    updateBlog(
      {
        url: blog.url,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        authoId: blog.user.id,
      },
      blog.id
    )
  }

  const remove = () => {
    if (window.confirm("are u sure to delete this blog")) {
      removeBlog(blog.id)
    }
  }
  return (
    <div style={blogStyle} className="note">
      <div>
        {" "}
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibilty}>{visible ? "hide" : "show"}</button>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes : {blog.likes} <button onClick={likeBlog}>like</button>{" "}
        </div>
        <div>{blog.user.username} </div>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
