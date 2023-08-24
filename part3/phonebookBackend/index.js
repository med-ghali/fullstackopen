const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 3000
const noteFound = "<h1>404 :Not Found</h1>"
app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request,response) => {
	response.json(persons);
})

app.get("/api/persons/:id",  (request,response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if (!person)
		response.status(404).send(noteFound)
	else
		response.json(person)
})

app.get("/api/info", (request,response) => {
	const p = new Date();
	const peopleInfo = `<p> Phonebook has info for ${persons.length} people </p>`
	const dateString = `<p> ${p.toString()} </p>`
	response.send(peopleInfo + dateString)
})

app.delete("/api/persons/:id",  (request,response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)
	response.status(204).end()
})

const generateId = () => {
	const id = Math.floor(Math.random() * 20000000)
	return id;
}

app.post("/api/persons", (request,response) => {
	person = request.body
	if (!person.name || !person.number)
	{
		response.status(400).json({error : "name and person attribute are required"})
		return
	}
	if (persons.some(p => p.name === person.name))
	{
		response.status(400).json({ error: 'name must be unique' })
		return
	}
	person.id = generateId()
	persons = persons.concat(person)
	response.json(person)
})


app.listen (PORT, () => {console.log(`server listening on port ${PORT}\n`)})