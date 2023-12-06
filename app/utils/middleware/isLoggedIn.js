const { authenticated } = require('../axiosConfig');

module.exports = (req, res, next) => {
  
	if (req.cookies.session?.loggedIn) {
		authenticated.interceptors.request.use((config) => {
			config.headers['Authorization'] = `Bearer ${req.cookies.session.token}`;
			return config;
		  });
		  
	  	res.locals.session = {
			username: req.cookies.session.username,
			loggedIn: req.cookies.session.loggedIn
	  	};
	} else {
		res.redirect('/login');
	}
  
	next();
  };