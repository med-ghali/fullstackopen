import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [likes, setLikes] = useState('')
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState({msg:'',isSuccess:false})

	const handleLogin = async (event) => {
		event.preventDefault()
		try{
			let data = await loginService.login({username,password})
			window.localStorage.setItem('logged user', JSON.stringify(data))
			setUser(data)
			setPassword('')
			setUsername('')
			blogService.setToken(data.token)
			updateNotif("user logged in", true)

		} catch(err) {
			updateNotif("wrong credentials", false)
		}
	}

	const logOut = () => {
		setUser(null)
		blogService.setToken(null)
		window.localStorage.removeItem('logged user')
		updateNotif("user logged out", true)
	}

	const addBlog = async (event) => {
		event.preventDefault()
		try{
			const newBlog = await blogService.create({author,url,likes,title})
			setBlogs(blogs.concat(newBlog.data))
			updateNotif("blog added", true)
		} catch(err) {
			console.log(error)
			updateNotif("blog cant be added", false)
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

	if (user)
		return (
			<>
				<Notification notif={notif}/>
				<Blogs username={user.username} blogs={blogs} logOut={logOut}/>
				<BlogsForm 
					author={author} changeAuthor={({target}) => setAuthor(target.value)}
					likes={likes} changeLikes={({target}) => setLikes(target.value)}
					title={title} changeTitle={({target}) => setTitle(target.value)}
					url={url} changeUrl={({target}) => setUrl(target.value)}
					addBlog={addBlog}
				/>
			</>
		)
	return (
		<>
			<Notification notif={notif}/>
			<LoginForm 
				username={username} changeUsername={({target}) => setUsername(target.value)}	
				password={password} changePassword={({target}) => setPassword(target.value)}
				handleLogin={handleLogin} 
			/>

		</>
	)
}

export default App