const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = require('./utils/config').DB_URL
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


mongoose.connect(mongoUrl).then( () => {
	console.log("connected to db");
}).catch (error => {
	console.log(error)
}) 

app.use(cors())
app.use(express.json())
app.use('/api/blogs',middleware.userExtractor)
app.use('/api/blogs',blogsRouter)
app.use('/api/users',usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)


module.exports = app