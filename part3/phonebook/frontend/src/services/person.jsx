import axios from 'axios'

const url = "http://localhost:3000/api/persons";

const getAll = () => {
	const request = axios.get(url);
	return request.then( (response) => response.data);
}

const create = (person) => {
	const request = axios.post(url,person)
	return request.then ( (response) => response.data);
}

const erease = (id) => {
	const personUrl = url + `/${id}`;
	const request = axios.delete(personUrl)
	return request;
}

const update = (person) => {
	const personUrl = url + `/${person.id}`;
	const request = axios.put(personUrl,person);
	return request.then(response => response.data);
}
export default {getAll, create, erease, update};