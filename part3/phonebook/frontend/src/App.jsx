import { useEffect,useState } from 'react'

import personService from './services/person'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notif,setNotif] = useState({msg: '', isSuccess:false})
	const updatePerson = (person,num) => {
		if(!window.confirm(`${person.name} is already added to the phonebook, replace the old phone with a new one ?`))
		return ;
		let newPerson = { ...person, number: num};
		personService.update(newPerson).then( (data) => {
			setPersons( persons.map( p => p.id === newPerson.id ? data : p))
			setNotif({msg:`phone number of ${newPerson.name} replaced succesfully`,isSuccess:true});
			setTimeout( () => {setNotif({msg:'',isSuccess:false})} , 5000);
		})
		.catch( (error) => {
			setNotif({msg :`informations of ${newPerson.name} has already been deleted form the server`,
				isSuccess:false});
			setPersons(persons.filter(p => p.id !== person.id));
			setTimeout( () => {setNotif({msg:'',isSuccess:false})} , 5000); 
		})

	}
	const addPerson = (event) =>{
		event.preventDefault()
		if (!newName || !newNumber)
			return ;
		if (persons.some( person => person.name === newName))
		{
			updatePerson(persons.filter(person => person.name === newName)[0], newNumber)
			return
		}
		personService.create({name:newName, number:newNumber}).then( newPerson => {
			setPersons(persons.concat( newPerson))
			setNewName('') 
			setNewNumber('') 
			setFilter('')
			setNotif({msg:`added ${newName}`, isSuccess:true})
			setTimeout( () => {setNotif({msg:'',isSuccess:false})} , 5000); 
		}).catch (error => {
			setNewName('') 
			setNewNumber('') 
			setFilter('')
			setNotif({msg:error.response.data.error, isSuccess:false})
			setTimeout( () => {setNotif({msg:'',isSuccess:false})} , 5000); 
		}) 

		
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
	const deletePerson = (person) =>{
		if(!window.confirm(`Delete ${person.name}`))
			return ;
		personService.erease(person.id)
		.then( response => {
			setPersons(persons.filter(p => p.id !== person.id));
		})
	} 
	useEffect(hook,[])
	const filterByName = (person) => person.name.slice(0,filter.length).toLowerCase() === 
										filter.toLowerCase()
	const personsToShow = filter ? persons.filter(filterByName) : persons
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notif={notif}/>
			<Input label="filter shown with" value={filter} updateValue={updatefilter}/>
			<h3>Add a new</h3>
			<PersonForm	
						addPerson={addPerson} 
						updateName={updateName} newName={newName} 
						updateNumber={updateNumber} newNumber={newNumber}
			/>
				<h2>Numbers</h2>
			<Persons persons={personsToShow} deletePerson={deletePerson}/>
		</div>
	)
}

export default App
