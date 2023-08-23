import axios from 'axios'


const getAll = () => {
	const url = "https://studies.cs.helsinki.fi/restcountries/api/all/";
	return axios.get(url).then((response) => response.data)
}

export default getAll;