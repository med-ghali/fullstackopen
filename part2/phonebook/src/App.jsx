import { useEffect,useState } from 'react'

import personService from './services/person'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Input from './components/Input'


const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
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
		personService.create({name:newName, number:newNumber}).then( newPerson => {
			setPersons(persons.concat( newPerson))
			// console.log(newPerson);
		})
		setNewName('') 
		setNewNumber('') 
		setFilter('') 
	}
	const updateName = (event) =>{
		setNewName(event.target.value)
	}
	const updateNumber = (event) =>{
		setNewNumber(event.target.value)
	} 
	const updatefilter = (event) =>{
		setFilter(event.target.value)
	}
	const hook = () => {
		personService.getAll().then((personsData) => {setPersons(personsData)})
	} 
	useEffect(hook,[])
	const filterByName = (person) => person.name.slice(0,filter.length).toLowerCase() === 
										filter.toLowerCase()
	const personsToShow = filter ? persons.filter(filterByName) : persons
	return (
		<div>
			<h2>Phonebook</h2>
		<Input label="filter shown with" value={filter} updateValue={updatefilter}/>
		<h3>Add a new</h3>
		<PersonForm	
					addPerson={addPerson} 
					updateName={updateName} newName={newName} 
					updateNumber={updateNumber} newNumber={newNumber}
		/>
			<h2>Numbers</h2>
		<Persons persons={personsToShow}/>
		</div>
	)
}

export default App
