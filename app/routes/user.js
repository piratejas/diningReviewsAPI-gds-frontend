const express = require('express');
const router = express.Router();
const authenticateUser = require('../utils/middleware/authenticateUser');
const createSessionCookie = require('../utils/createSessionCookie');
const validateRegistration = require('../utils/validateRegistration');
const { login, register, getProfile, logout } = require('../models/user');


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
				const loginError = {
					text: "Provide a valid username or password",
					href: "#login-error"
				};
				res.render('user/login.njk', { loginError });
			} else {
				res.redirect('/internalServerError');
			}
        }
    })

router.route("/registration")
    .get((req, res, next) => {
        res.render('user/registration.njk');
    })
    .post(async (req, res, next) => {
		const formData = req.body;
		let validationErrors;
		try {
			validationErrors = validateRegistration(formData);
			if (Object.keys(validationErrors).length > 0) {
				console.log(validationErrors);
				res.render('user/registration.njk', { validationErrors, formData });
			} else {
				await register(formData);
				res.redirect("/user/confirmation");
			}
        } catch (error) {
			if (error.response?.status === 409) {
				validationErrors['username'] = {
					text: "Username must be unique - choose a new username",
                    href: "#username"
                };
                res.render('user/registration.njk', { validationErrors, formData });
            } else {
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

router.use(authenticateUser);

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