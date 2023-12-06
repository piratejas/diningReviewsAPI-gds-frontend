const { notAuthenticated, authenticated } = require('../utils/axiosConfig');

const login = async (req) => {
	
	const data = {
		"username": req.body.username,
		"password": req.body.password
	}

	return await notAuthenticated.post('/login', data);
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

	return await notAuthenticated.post('/register', data);
}

const getProfile = async (res) => {

	return await authenticated.get(`/${res.locals.session.username}`);
}

const logout = (res) => {
	
	res.clearCookie('session');
	authenticated.interceptors.request.clear();
}

module.exports = {
	login,
	register,
	getProfile,
	logout
}