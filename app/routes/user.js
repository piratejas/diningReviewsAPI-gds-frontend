const express = require('express');
const router = express.Router();
const axios = require('axios');
const cookieParser = require('cookie-parser');

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

const isLoggedIn = (req, res, next) => {
  
	if (req.cookies.session.loggedIn) {
	  req.headers['Authorization'] = `Bearer ${req.cookies.session.token}`;
	  res.locals.session = {
		username: req.cookies.session.username,
		loggedIn: req.cookies.session.loggedIn
	  };
	}
  
	next();
  };

router.route("/login")
    .get((req, res, next) => {
        res.render('user/login.njk');
    })
    .post(async (req, res, next) => {
		const data = {
			"username": req.body.username,
			"password": req.body.password
		}

		try {
            const response = await axios.post('http://localhost:4001/auth/login', data);

            if (response.status === 200) {
				console.log(response.data);
				const cookieData = {
					username: response.data.username,
					token: response.data.jwt,
					loggedIn: true
				}

                res.cookie('session', cookieData, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set to true in production if using HTTPS
                    maxAge: 60 * 60 * 1000, // 1hr
                    sameSite: 'Lax',
                    path: '/'
                });
                res.redirect("/user/contents");
            } else {
                // TODO
                res.status(response.status).send('Login failed');
            }
        } catch (error) {
            // TODO
            console.error('Error sending POST request:', error);
            res.status(500).send('Internal Server Error');
        }
    })

router.route("/registration")
    .get((req, res, next) => {
        res.render('user/registration.njk');
    })
    .post(async (req, res, next) => {
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
	res.render('user/logout.njk');
})

router.use(isLoggedIn);

router.get("/contents", (req, res, next) => {
    res.render('user/contents.njk');
})

router.get("/profile", async (req, res, next) => {
	const response = await axios.get(`http://localhost:4001/users/${res.locals.session.username}`, {
		withCredentials: false
	});
	// console.log(req.headers);
    res.render('user/profile.njk');
})

router.get("/profile/password", (req, res, next) => {
    res.render('user/change-password.njk');
})

module.exports = router;