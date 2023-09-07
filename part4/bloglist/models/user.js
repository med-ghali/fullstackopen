const mongoose = require('mongoose') 
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	name: {type :String },
	username: {type :String, required:true, minLength: 3, unique: true},
	password: {type :String, required:true},
	blogsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
        // delete returnedObject.blogsIds;
	}
})

module.exports = mongoose.model('User', userSchema)
