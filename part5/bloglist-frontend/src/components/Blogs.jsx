const Blogs = ({ blogs, username, logOut, updateBlog, removeBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {username} loged in <button onClick={logOut}>log out</button>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
