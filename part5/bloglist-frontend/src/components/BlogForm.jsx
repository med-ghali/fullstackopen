import { useState } from 'react'
import Input from "./Input"

const BlogForm = ({addBlog}) =>{
	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('')
	const [likes, setLikes] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = async (event) => {
		event.preventDefault()
		try{
			await addBlog({title,author,likes,url})
			setAuthor('')
			setLikes('')
			setTitle('')
			setUrl('')
		} catch (err) {}
	}

	return (
		<>
			<h2> Create a new Blog</h2>
			<form onSubmit={createBlog}>
				<Input label="title" value={title} handleChange={({target}) => setTitle(target.value)} />
				<Input label="author" value={author} handleChange={({target}) => setAuthor(target.value)} />
				<Input label="likes" value={likes} handleChange={({target}) => setLikes(target.value)} />
				<Input label="url" value={url} handleChange={({target}) => setUrl(target.value)} />
				<button type="submit"> add Blog</button>
			</form>
		</>
	)
}

export default BlogForm