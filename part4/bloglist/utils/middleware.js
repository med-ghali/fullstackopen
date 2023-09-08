
const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformed id' });
	else if (error.name === 'ValidationError')
		return response.status(400).json({ error: error.message });
	else if (error.name === 'Authentication error')
		return response.status(401).json({ error: error.message });
	next(error);
};

const tokenExtractor = (request,response,next) => {
	const authorization = request.get('Authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}
	next()
}

module.exports = {errorHandler,tokenExtractor}