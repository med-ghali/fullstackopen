const mongoose = require('mongoose')

const password = "ghali.rca"
const url =  `mongodb+srv://ghali:${password}@cluster0.6v7pljb.mongodb.net/Phonebook-db?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)

mongoose.connect(url).then( () => {
	console.log("connected to MongoDB")
}). catch ( (error) => {
	console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({name: String,number: String})
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)