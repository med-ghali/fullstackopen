import Input from './Input'

const LoginForm = ({handleLogin, username, password, changeUsername, changePassword}) => {
	return (
		<>
			<h1> log in to application</h1>
			<form onSubmit={handleLogin}>
				<Input label="username" value={username} handleChange={changeUsername}/>
				<Input label="password" value={password} handleChange={changePassword}/>
				<button type="submit">login</button>
			</form>
		</>
	)
}
export default LoginForm