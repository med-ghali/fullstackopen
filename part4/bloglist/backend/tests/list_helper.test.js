const listHelper = require("../utils/list_helper.js")
const blogs = require('./blogs_list.js').blogs

test('dummy returns one', () => {
	const blogs = []
	
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const listWithOneBlog = blogs.filter(blog => blog._id === "5a422aa71b54a676234d17f8")
	const listWithZeroLikes = blogs.filter( blog => blog.likes === 0)

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when list has many blogs, equals the likes of that', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(36)
	})

	test('when list has many blogs with zero likes, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithZeroLikes)
		expect(result).toBe(0)
	})

	test('when list is empty, equals the likes of that', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})
})

describe('favoriteBlog', () => {
	const listWithOneBlog = blogs.filter(blog => blog._id === "5a422aa71b54a676234d17f8")
	const listWithZeroLikes = blogs.filter( blog => blog.likes === 0)
	const maxLikesBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	}

	test('when list has one blog', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog)
		expect(result).toEqual(listWithOneBlog[0])
	})
	test('when list has many blogs', () => {
		const result = listHelper.favoriteBlog(blogs)
		expect(result).toEqual(maxLikesBlog)
	})
	test('with many possible results', () => {
		const result = listHelper.favoriteBlog(listWithZeroLikes)

		expect(listWithZeroLikes).toContainEqual(result)
	})
})