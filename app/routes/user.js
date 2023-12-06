const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const createSessionCookie = require('../utils/createSessionCookie');
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const { login, register, getProfile, logout } = require('../models/user');

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
            if (error.response.status === 401) {
				// TODO
				console.log(error.response);
				res.status(401).send(error.response.data.message);
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
            await register(req);
			res.redirect("/user/confirmation");
        } catch (error) {
			if (error.response.status === 409) {
				// TODO
				console.log(error.response);
                res.status(409).send(error.response.data.message);
            } else {
				// console.error('Error sending POST request:', error);
				res.redirect('/internalServerError');
            }
        }
    })
	
router.get("/confirmation", (req, res, next) => {
	res.render('user/confirmation.njk');
})

router.get("/logout", (req, res, next) => {
	logout(res);
	res.render('user/logout.njk');
})

router.use(isLoggedIn);

router.get("/contents", (req, res, next) => {
    res.render('user/contents.njk');
})

router.get("/profile", async (req, res, next) => {
	const response = await getProfile(res);
	const user = response.data;
    res.render('user/profile.njk', { user });
})

router.get("/profile/password", (req, res, next) => {
    res.render('user/change-password.njk');
})

module.exports = router;