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


const noteFound = "<h1>404 :Not Found</h1>"


app.get("/api/persons", (request,response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	})
})

app.get("/api/persons/:id",  (request,response) => {
	const id = request.params.id
	Person.findById(id).then( person => {
			response.json(person)
	}).catch ((error) => {
		response.status(404).send(noteFound)
	})
})

app.get("/api/info", (request,response) => {
	Person.find({}).then((persons) => {
		const p = new Date();
		const peopleInfo = `<p> Phonebook has info for ${persons.length} people </p>`
		const dateString = `<p> ${p.toString()} </p>`
		response.send(peopleInfo + dateString)
	})
})

app.delete("/api/persons/:id",  (request,response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

app.post("/api/persons", (request,response) => {
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
	)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// "buildui": "shx rm -rf dist && cd ../frontend && npm run build && shx cp -r dist ../backend",
// "deployfull": "npm run buildui && git add . && git commit -m uibuild && git push"