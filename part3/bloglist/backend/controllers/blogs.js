const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

app.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})


app.get('/:id', (request, response) => {
	Blog
		.findById(request.params.id)
		.then(blog => {
		response.json(blog)
		})
})


app.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
})

module.exports = blogsRouter