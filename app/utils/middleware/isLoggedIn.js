const axios = require('axios');

module.exports = (req, res, next) => {
  
	if (req.cookies.session.loggedIn) {
		res.locals.requestInterceptor = axios.interceptors.request.use((config) => {
			config.headers['Authorization'] = `Bearer ${req.cookies.session.token}`;
			return config;
		  });
		  
	  	res.locals.session = {
			username: req.cookies.session.username,
			loggedIn: req.cookies.session.loggedIn
	  	};
	}
  
	next();
  };