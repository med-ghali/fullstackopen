const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogs = require('./blogs_list.js').blogs
const Blog = require('../models/blog')


const api = supertest(app)

beforeEach( async ()=> {
	await Blog.deleteMany({})
	const blogObjects = blogs.map (blog => new Blog(blog))
	const promiseArray = blogObjects.map (blog => blog.save())
	await Promise.all(promiseArray)
})

test('returns the correct amount of blog posts', async () => {
	const result = await api.get('/api/blogs').expect(200)
						.expect('Content-Type', /application\/json/)
	expect(result.body).toHaveLength(blogs.length)
	
})

test('verify id proproty', async () => {
	const result = await api.get('/api/blogs').expect(200) 
	expect(result.body[0]._id).toBeDefined()
})

afterAll(async () => {
	await mongoose.connection.close()
})