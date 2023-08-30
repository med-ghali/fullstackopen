const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = require('./utils/config').DB_URL
const blogsRouter = require('./controllers/blogs')

mongoose.connect(mongoUrl).then( () => {
	console.log("connected to db");
}).catch (error => {
	console.log(error)
}) 

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)


module.exports = app