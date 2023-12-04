const express = require('express');
const router = express.Router();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const createSessionCookie = require('../utils/createSessionCookie');
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const { login, register } = require('../models/user');

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.route("/login")
    .get((req, res, next) => {
        res.render('user/login.njk');
    })
    .post(async (req, res, next) => {
		try {
            const response = await login(req);				createSessionCookie(res, response.data);
            res.redirect("/user/contents");
        } catch (error) {
            if (error.response?.status === 401) {
				res.status(401).send('Login failed.');
			} else {
				// console.error('Error sending POST request:', error);
				res.redirect('/internalServerError');
			}
        }
    })

router.route("/registration")
    .get((req, res, next) => {
        res.render('user/registration.njk');
    })
    .post(async (req, res, next) => {
		try {
            register(req);
			res.redirect("/user/confirmation");

        } catch (error) {
			console.log("Error");
            // if (error.response?.status === 409) {
			// 	// TODO
            //     res.status(409).send('Username already in use. Please choose another username.');
            // } else {
			// 	// TODO
			// 	console.error('Error sending POST request:', error.response.status);
			// 	res.status(500).send('Internal Server Error');
            // }
        }
    })
	
router.get("/confirmation", (req, res, next) => {
	res.render('user/confirmation.njk');
})

router.get("/logout", (req, res, next) => {
	res.clearCookie('session');
	axios.interceptors.request.eject(res.locals.requestInterceptor);
	res.render('user/logout.njk');
})

router.use(isLoggedIn);

router.get("/contents", (req, res, next) => {
    res.render('user/contents.njk');
})

router.get("/profile", async (req, res, next) => {
	const response = await axios.get(`http://localhost:4001/users/${res.locals.session.username}`);
	const user = response.data;
    res.render('user/profile.njk', { user });
})

router.get("/profile/password", (req, res, next) => {
    res.render('user/change-password.njk');
})

module.exports = router;