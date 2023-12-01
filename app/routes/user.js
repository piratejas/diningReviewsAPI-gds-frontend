const express = require('express');
const router = express.Router();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const createSessionCookie = require('../utils/createSessionCookie');
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const { login } = require('../models/user');

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
				console.error('Error sending POST request:', error);
				res.status(500).send('Internal server error.')
			}
        }
    })

router.route("/registration")
    .get((req, res, next) => {
        res.render('user/registration.njk');
    })
    .post(async (req, res, next) => {
		// TODO - validation
		console.log(req.body);
        // const username = req.body.name;
        // const city = req.body.city;
        // const county = req.body.county;
        // const postCode = req.body.postCode;
		// const dairyAllergy = "dairyAllergy" in req.body;
        // const eggAllergy = "eggAllergy" in req.body;
		// const peanutAllergy = "peanutAllergy" in req.body;
        // const password = req.body.password;
        // const confirmPassword = req.body.confirmpassword;

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

		try {
            const response = await axios.post('http://localhost:4001/auth/register', data);

            if (response.status === 200) {
                res.redirect("/user/confirmation");
            } else {
				// TODO
                res.status(response.status).send('Registration failed');
            }
        } catch (error) {
            // TODO
            console.error('Error sending POST request:', error);
            res.status(500).send('Internal Server Error');
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