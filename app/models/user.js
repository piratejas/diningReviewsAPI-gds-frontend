const axios = require('axios');

const login = async (req) => {
	
	const data = {
		"username": req.body.username,
		"password": req.body.password
	}

	return await axios.post('http://localhost:4001/auth/login', data);
};

const register = async (req) => {

	const data = {
		"username": req.body.name,
		"password": req.body.password,
		"city": req.body.city,
		"county": req.body.county,
		"postCode": req.body.postCode,
		"dairyAllergy": "dairyAllergy" in req.body,
		"eggAllergy": "eggAllergy" in req.body,
		"peanutAllergy": "peanutAllergy" in req.body
	}

	return await axios.post('http://localhost:4001/auth/register', data);
}

module.exports = {
	login,
	register
}