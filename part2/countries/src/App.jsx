import { useState,useEffect } from 'react'
import getAll from './services/countries'
import Input from './components/Input.jsx'
import ShowCoutries from './components/ShowCoutries.jsx'

function App() {
	const [countriesData,setCountriesData] = useState([]);
	const [filter, setFilter] = useState('');
	const udpateFilter = (event) => {setFilter(event.target.value)} 
	const getCountriesData = () => {
		getAll().then( (countriesData) => setCountriesData(countriesData))
	}
	const isCoutrySearched = (coutry) => (coutry.name.common.toLowerCase().includes(filter.toLowerCase()))
	const filtredCoutries = filter ? countriesData.filter(isCoutrySearched) : []
	useEffect(() => {getCountriesData()},[])
	return (
		<>
			<Input label="find coutries" value={filter} updateValue={udpateFilter}/>
			<ShowCoutries coutries={filtredCoutries} setFilter={setFilter}/>
		</>
	)
}

export default App
