const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post("/", async (request,response,next) => {
	const { username, name, password } = request.body
	if (password.length < 3)
	{
		next({name:"ValidationError" ,message:"password to short"})
		return 
	}
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password,saltRounds)
	console.log(passwordHash)
	const user = new User({username, name, password: passwordHash})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

usersRouter.get("/", async (request,response) => {
	const users = await User.find({})
	response.json(users)
})

module.exports = usersRouter