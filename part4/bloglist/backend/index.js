const app = require('./app.js')
const PORT = require('./utils/config.js').PORT


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})