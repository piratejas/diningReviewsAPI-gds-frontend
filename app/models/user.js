const axios = require('axios');

const login = async (req) => {
	
	const data = {
		"username": req.body.username,
		"password": req.body.password
	}

	return await axios.post('http://localhost:4001/auth/login', data);
};

module.exports = {
	login,
}