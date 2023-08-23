const CoutryField = ({name,setFilter}) => {
	return (
		<div>
			{name} {" "}
			<button onClick={() =>setFilter(name)}>show</button>
		</div>
	)
}
const ShowOneCountry = ({country}) => {
	if (!country)
		return null;
	const langList = [];
	for(const key in country.languages)
		langList.push(<li key={key}>{country.languages[key]}</li>)
	return (
		<>
			<h1>{country.name.common}</h1>
			<p> capital {country.capital[0]}</p>
			<p> area {country.area}</p>
			<h3>language</h3>
			<ul>
				{langList}
			</ul>
			<img src={country.flags.png} alt="country flag" />
		</>
	)
}

const ShowCoutries = ({coutries,setFilter}) => {
	if (coutries.length == 1)
		return ( <ShowOneCountry country={coutries[0]} />)
	if (coutries.length > 10)
		return ( <p>Too many matches, specify another filter</p>)
	const contriesList = coutries.map( (country) => <CoutryField setFilter={setFilter} key={country.cca2} name={country.name.common}/>)
	return (
		<>
			{contriesList}
		</>
	)
}

export default ShowCoutries;