const axios = require('axios');

const login = async (req) => {
	
	const data = {
		"username": req.body.username,
		"password": req.body.password
	}

	try {
		return await axios.post('http://localhost:4001/auth/login', data);
	  } catch (error) {
		throw error;
	  }
};

module.exports = {
	login,
}