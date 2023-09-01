const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = require('./utils/config').DB_URL
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.connect(mongoUrl).then( () => {
	console.log("connected to db");
}).catch (error => {
	console.log(error)
}) 

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)
app.use(middleware.errorHandler)


module.exports = app