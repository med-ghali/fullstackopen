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
	expect(result.body[0].id).toBeDefined()
})

test('adding a new blog', async () => {
	const newBlog = {	title: "How to Dockerize a React Application",
						author: "Kunal Nalawade ",
						url: "https://www.freecodecamp.org/news/how-to-dockerize-a-react-application/",
						likes: 21
	}
	const result = await api.post('/api/blogs').send(newBlog).expect(201)
    .expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	const titles = response.body.map(blog => blog.title)
	expect(response.body).toHaveLength(blogs.length + 1)
	expect(titles).toContain(newBlog.title)
})

test('missing likes proproty gets inited by zero', async () => {
	const newBlog = {	title: "Learn NestJS by Building a CRUD API",
						author: "Beau Carnes",
						url: "https://www.freecodecamp.org/news/learn-nestjs-by-building-a-crud-api/",
	}
	const result = await api.post('/api/blogs').send(newBlog).expect(201)
    .expect('Content-Type', /application\/json/)
	
	expect(result.body.likes).toBeDefined()
	expect(result.body.likes).toBe(0)
})

test('post with missing url or title', async () => {
	const newBlog = {	title: "Learn NestJS by Building a CRUD API",
						author: "Beau Carnes",
						likes:0
	}
	
	const result = await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete a blog', async ()=> {
	const blogId = blogs[0]._id;
	await api.delete(`/api/blogs/${blogId}`).expect(204);
	let newBlogs = await api.get('/api/blogs').expect(200)
	newBlogs = newBlogs.body
	const ids = newBlogs.map( blog => blog.id)
	expect(newBlogs.length).toBe(blogs.length - 1)
	expect(ids).not.toContain(blogId)
})

test('updating a blog', async ()=> {
	const newBlog = {	title: blogs[0].title,
						author: blogs[0].author,
						likes:blogs[0].likes + 90
	}
	const updatedBlog = await api.put(`/api/blogs/${blogs[0]._id}`).send(newBlog).expect(200);
	expect(updatedBlog.body.likes).toBe(blogs[0].likes + 90)
})

afterAll(async () => {
	await mongoose.connection.close()
})