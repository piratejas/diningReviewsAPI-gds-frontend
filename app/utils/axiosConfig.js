const axios = require('axios');

const notAuthenticated = axios.create({
	baseURL: 'http://localhost:4001/auth'
});

const authenticated = axios.create({
	baseURL: 'http://localhost:4001/users'

})

module.exports = {
	notAuthenticated,
	authenticated
}