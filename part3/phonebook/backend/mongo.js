const mongoose = require("mongoose")

if (process.argv.length<3) {
	console.log("give password as argument")
	process.exit(1)
}

const password = process.argv[2];

const url =  `mongodb+srv://ghali:${password}@cluster0.6v7pljb.mongodb.net/Phonebook-db?retryWrites=true&w=majority`

mongoose.set("strictQuery",false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({name: String,number: String})
const Person = mongoose.model("Person", personSchema)
const ShowAll = (collection) => {
	collection.find({}).then(result => {
		result.forEach(doc => {
			console.log(doc)
		})
		mongoose.connection.close()
	})
}

if (process.argv.length > 4) {
	const person = new Person({name: process.argv[3],number: process.argv[4]})
	person.save().then( () => {
		ShowAll(Person)
	})
}
else {
	ShowAll(Person)
}

