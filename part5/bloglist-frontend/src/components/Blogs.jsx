const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const Blogs = ({blogs,username,logOut}) => {
	console.log(blogs)
	return (
		<div>
			<h2>blogs</h2>
			<h3> {username} loged in </h3>  <button onClick={logOut}>log out</button>	
			{blogs.map( blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default Blogs