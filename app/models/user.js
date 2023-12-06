const { notAuthenticated, authenticated } = require('../utils/axiosConfig');


const login = async (req) => {
	
	const data = {
		"username": req.body.username,
		"password": req.body.password
	}

	return await notAuthenticated.post('/login', data);
};

const register = async (validatedData) => {

	const data = {
		"username": validatedData.name,
		"password": validatedData.password,
		"city": validatedData.city,
		"county": validatedData.county,
		"postCode": validatedData.postCode,
		"dairyAllergy": "dairyAllergy" in validatedData,
		"eggAllergy": "eggAllergy" in validatedData,
		"peanutAllergy": "peanutAllergy" in validatedData
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