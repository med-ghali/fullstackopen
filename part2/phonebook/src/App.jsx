import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addPerson = (event) =>{
	let name = newName
	let number = newNumber
	event.preventDefault()
	if (!newName || !newNumber)
		return ;
	if (persons.some( person => person.name === newName))
	{
		alert(`${newName} is already added to phonebook`)
		setNewNumber('')
		setNewName('')
		return
	}
	setNewName('')
	setNewNumber('')
	setPersons(persons.concat( {name: name, number: number}))
  }
  const updateName = (event) =>{
	setNewName(event.target.value)
  }
  const updateNumber = (event) =>{
	setNewNumber(event.target.value)
  } 
  return (
    <div>
      <h2>Phonebook</h2>
	  <h3>Add a new</h3>
	  <PersonForm addPerson={addPerson} updateName={updateName} newName={newName} 
	  	updateNumber={updateNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
	  <Persons persons={persons}/>
    </div>
  )
}

export default App