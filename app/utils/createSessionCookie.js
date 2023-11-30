module.exports = (res, payload) => {
	const cookieData = {
		username: payload.username,
		token: payload.jwt,
		loggedIn: true
	}

	res.cookie('session', cookieData, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
		maxAge: 60 * 60 * 1000, // 1hr
		sameSite: 'Lax',
		path: '/'
	});
}