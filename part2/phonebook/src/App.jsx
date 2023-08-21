import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Input from './components/Input'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filter, setFilter] = useState('')
  const addPerson = (event) =>{
	event.preventDefault()
	if (!newName || !newNumber)
		return ;
	if (persons.some( person => person.name === newName))
	{
		alert(`${newName} is already added to phonebook`)
		return
	}
	setPersons(persons.concat( {name: newName, number: newNumber}))
	setNewName('') 
	setNewNumber('') 
	setFilter('') 
	setPersonsToShow(persons.concat( {name: newName, number: newNumber}))
  }
  const updateName = (event) =>{
	setNewName(event.target.value)
  }
  const updateNumber = (event) =>{
	setNewNumber(event.target.value)
  } 
  const updatefilter = (event) =>{
	setFilter(event.target.value)
	setPersonsToShow(persons.filter( 
		p => p.name.slice(0,event.target.value.length).toLowerCase() ===
				event.target.value.toLowerCase()
	))
  }
  return (
    <div>
      <h2>Phonebook</h2>
	  <Input label="filter shown with" value={filter} updateValue={updatefilter}/>
	  <h3>Add a new</h3>
	  <PersonForm addPerson={addPerson} updateName={updateName} newName={newName} 
	  	updateNumber={updateNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
	  <Persons persons={personsToShow}/>
    </div>
  )
}

export default App
