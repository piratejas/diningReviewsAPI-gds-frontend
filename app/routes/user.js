const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.urlencoded({ extended: true }));

router.route("/login")
    .get((req, res, next) => {
        res.render('user/login.njk');
    })
    .post((req, res, next) => {
		// TODO: form handler middleware
        res.redirect("/user/contents");
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
            // Make a POST request to the external server
            const response = await axios.post('http://localhost:4001/auth/register', data);

            // Assuming the external server responds with a success status
            if (response.status === 200) {
                // Redirect to confirmation page after successful registration
                res.redirect("/user/confirmation");
            } else {
                // Handle other response statuses as needed
                res.status(response.status).send('Registration failed');
            }
        } catch (error) {
            // Handle errors from the POST request
            console.error('Error sending POST request:', error);
            res.status(500).send('Internal Server Error');
        }
    })

router.get("/confirmation", (req, res, next) => {
    res.render('user/confirmation.njk');
})

router.get("/contents", (req, res, next) => {
    res.render('user/contents.njk');
})

router.get("/logout", (req, res, next) => {
    res.render('user/logout.njk');
})

router.get("/profile", (req, res, next) => {
    res.render('user/profile.njk');
})

router.get("/profile/password", (req, res, next) => {
    res.render('user/change-password.njk');
})

module.exports = router;