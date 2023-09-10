import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState({msg:'', isSuccess:false})

	const handleLogin = async (credentials) => {
		try{
			let data = await loginService.login(credentials)
			window.localStorage.setItem('logged user', JSON.stringify(data))
			setUser(data)
			blogService.setToken(data.token)
			updateNotif("user logged in", true)
		} catch(err) {
			updateNotif("wrong credentials", false)
			throw new Error("wrong credentials")
		}
	}

	const updateBlog = async (blog,id) => {
		try{
			const updatedBlog = await blogService.update(blog,id)
			updatedBlog.user = {username: user.username}
			setBlogs(
				blogs.filter(b => b.id != id).concat(updatedBlog)
			)
			updateNotif("blog liked", true)
		}catch (err){
			console.log(err)
		}
	}

	const removeBlog = async (id) => {
		try{
			await blogService.remove(id)
			setBlogs(blogs.filter(b => b.id != id))
			updateNotif("blog deleted", true)
		}catch (err){
			console.log(err)
		}
	}

	const logOut = () => {
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('logged user')
		updateNotif("user logged out", true)
	}

	const addBlog = async (blog) => {
		try{
			const newBlog = await blogService.create(blog)
			newBlog.user = {username: user.username}
			setBlogs(blogs.concat(newBlog))
			updateNotif("blog added", true)
		} catch(err) {
			updateNotif("blog cant be added", false)
			console.log(err)
			throw new Error("blog cant be added")
		}
	}

	const updateNotif = (msg,isSuccess) => {
		setNotif({msg,isSuccess})
		setTimeout(() => {
			setNotif({msg:'',isSuccess:false})
		}, 5000);
	}
	
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		).catch (err => {
		console.log(err)
	})
	}, [])

	useEffect(() => {
		const userData = window.localStorage.getItem("logged user")
		if (userData)
		{
			const data = JSON.parse(userData)
			setUser(data)	
			blogService.setToken(data.token)
		}
	}, [])

	const sortedBlogs = [ ...blogs].sort( (a,b) => b.likes - a.likes)
	if (user)
		return (
			<>
				<Notification notif={notif}/>
				<Blogs username={user.username} blogs={sortedBlogs} logOut={logOut} 
						updateBlog={updateBlog} removeBlog={removeBlog}/> 
				<Togglable buttonLabel="new blog">
					<BlogsForm addBlog={addBlog} />
				</Togglable>
			</>
		)
	return (
		<>
			<Notification notif={notif}/>
			<LoginForm handleLogin={handleLogin} />
		</>
	)
}

export default App