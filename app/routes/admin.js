const express = require('express');
const router = express.Router();
const authenticateUser = require('../utils/middleware/authenticateUser');


router.use(authenticateUser);

router.route("/dashboard")
	.get(async (req, res, next) => {
		const response = await getPendingReviews();
		const reviews = response.data;
		res.render('admin/dashboard.njk', { reviews });
	})

module.exports = router;