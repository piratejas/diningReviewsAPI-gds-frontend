const axios = require('axios');

const notAuthenticatedUser = axios.create({
	baseURL: 'http://localhost:4001/auth'
});

const authenticatedUser = axios.create({
	baseURL: 'http://localhost:4001/users'

})