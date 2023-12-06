const axios = require('axios');

const notAuthenticated = axios.create({
	baseURL: 'http://localhost:4001/auth'
});

const authenticated = axios.create({
	baseURL: 'http://localhost:4001/users'

})

const admin = axios.create({
	baseURL: 'http://localhost:4001/admin'
})

module.exports = {
	notAuthenticated,
	authenticated,
	admin
}