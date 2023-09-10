import Input from './Input'
import { useState } from 'react'

const LoginForm = ({handleLogin}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = async (event) => {
		event.preventDefault()
		try{
			await handleLogin({username,password})
			setUsername('')
			setPassword('')
		}catch (error) {}
	}

	return (
		<>
			<h1> log in to application</h1>
			<form onSubmit={login}>
				<Input label="username" value={username} handleChange={({target}) => setUsername(target.value)}	/>
				<Input label="password" value={password} handleChange={({target}) => setPassword(target.value)}	/>
				<button type="submit">login</button>
			</form>
		</>
	)
}
export default LoginForm