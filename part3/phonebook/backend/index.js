require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()
app.use(cors())


app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use( morgan(':method :url :status :req[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

const notFound = "<h1>404 :Not Found</h1>"

app.get("/api/persons", (request,response,next) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	}).catch ((error) => {
		next(error)
	})
})

app.get("/api/persons/:id",  (request,response,next) => {
	Person.findById(request.params.id).then( person => {
		if (person)
			response.json(person)
		else
			response.status(404).send(notFound)
	}).catch ((error) => {
		next(error)
	})
})

app.get("/api/info", (request,response,next) => {
	Person.find({}).then((persons) => {
		const p = new Date();
		const peopleInfo = `<p> Phonebook has info for ${persons.length} people </p>`
		const dateString = `<p> ${p.toString()} </p>`
		response.send(peopleInfo + dateString)
	}).catch ((error) => {
		next(error)
	})
})

app.delete("/api/persons/:id",  (request,response,next) => {
	const id = request.params.id
	Person.findByIdAndDelete(id).then ( (result) =>{
		response.status(204).end()
	}).catch (error => {
		next(error)
	})
})

app.post("/api/persons", (request,response,next) => {
	let body = request.body
	if (!body.name || !body.number)
	{
		response.status(400).json({error : "name and person attribute are required"})
		return
	}
	let person = new Person({
		name: body.name,
		number: body.number,
	})
	person.save().then( 
		savedPerson => response.json(savedPerson)
	).catch ((error) => {
		next(error)
	})
})

app.put ("/api/persons/:id", (request,response,next) => {
	Person.findByIdAndUpdate(request.params.id, request.body, { new: true,runValidators: true, context: 'query' })
	.then((result) => {
		if (result)
			response.json(result)
		else
			response.status(404).json({error: "resource already deleted"})
	}).catch (error => {
		next(error)
	})
})

const errorHandler = (error, request, response, next) => {
	console.log(error);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}  else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}
  
app.use(errorHandler)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
