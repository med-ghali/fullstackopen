const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const SECRET = require('../utils/config').SECRET
const jwt = require('jsonwebtoken')

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

blogsRouter.delete('/:id', async (request, response, next) => {
	if(!request.user)
		return next({name : "Authentication error", message: "invalid token"})
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(204).end()
	if (user._id.toString() !== blog.authorId.toString())
		return next({name : "Authentication error", message: "not authorized to delete this resource"})
	await Blog.findByIdAndDelete(blog._id)
	user.blogsIds = user.blogsIds.filter( id => id.toString() !== blog._id.toString() )
	await user.save()
	return response.status(204).end()
})

blogsRouter.post('/', async (request, response, next) => {
	if(!request.user)
		return next({name : "Authentication error", message: "invalid token"})
	const user = request.user
	const blog = new Blog({...request.body, authorId: user._id})
	const savedBlog = await blog.save()
	user.blogsIds = user.blogsIds.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	if(!request.user)
		return next({name : "Authentication error", message: "invalid token"})
	const newBlog = request.body
	updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true})
	response.json(updatedBlog)
})

module.exports = blogsRouter