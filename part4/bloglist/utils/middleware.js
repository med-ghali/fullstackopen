const jwt = require('jsonwebtoken')
const User = require('../models/user')
const SECRET = require('../utils/config').SECRET

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformed id' });
	else if (error.name === 'ValidationError')
		return response.status(400).json({ error: error.message });
	else if (error.name === 'Authentication error')
		return response.status(401).json({ error: error.message });
	next(error);
}

const tokenExtractor = (request) => {
	const authorization = request.get('Authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

const userExtractor = async (request, response, next) => {
	const token = tokenExtractor(request)
	if (!token)
		return next()
	const decodedToken = jwt.verify(token,SECRET)
	if (!decodedToken)
		return next()
	request.user = await User.findById(decodedToken.id)
	next()
}

module.exports = {errorHandler,userExtractor}