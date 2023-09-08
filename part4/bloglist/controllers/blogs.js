const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const SECRET = require('../utils/config').SECRET
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('Authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('authorId', {name:1 , username:1, id: 1})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
	const token = getTokenFrom(request)
	console.log(token)
	const decodedToken = jwt.verify(token,SECRET)
	if (!decodedToken)
		return next({name : "Authentication error", message: "token invalid"})
	const user = await User.findById(decodedToken.id)
	const blog = new Blog({...request.body, authorId: user._id})
	const savedBlog = await blog.save()
	user.blogsIds = user.blogsIds.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const newBlog = request.body
	console.log(newBlog)
	updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true})
	response.json(updatedBlog)
})

module.exports = blogsRouter