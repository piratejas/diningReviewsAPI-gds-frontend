module.exports = (res, data) => {
	const cookieData = {
		username: data.username,
		token: data.jwt,
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