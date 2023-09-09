import Input from "./Input"
const BlogForm = ({author,url,likes,title,changeTitle,changeAuthor,changeUrl,changeLikes,addBlog}) =>{
	return (
		<>
			<h2> Create a new Blog</h2>
			<form onSubmit={addBlog}>
				<Input label="title" value={title} handleChange={changeTitle} />
				<Input label="author" value={author} handleChange={changeAuthor} />
				<Input label="likes" value={likes} handleChange={changeLikes} />
				<Input label="url" value={url} handleChange={changeUrl} />
				<button type="submit"> add Blog</button>
			</form>
		</>
	)
}

export default BlogForm