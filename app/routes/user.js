const express = require('express');
const router = express.Router();

router.get("/login", (req, res, next) => {
    res.render('user/login.njk');
})

router.get("/registration", (req, res, next) => {
    res.render('user/registration.njk');
})

module.exports = router;