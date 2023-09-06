const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('authorId')
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
	const users = await User.find({})
	const blog = {...request.body, authorId: users[0]._id}
	const newBlog = new Blog(blog)
	const result = await newBlog.save()
	response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
	const newBlog = request.body
	console.log(newBlog)
	updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new:true})
	response.json(updatedBlog)
})

module.exports = blogsRouter