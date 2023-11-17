const express = require('express');
const router = express.Router();

router.route("/login")
    .get((req, res, next) => {
        res.render('user/login.njk');
    })
    .post((req, res, next) => {
        res.redirect("/user/contents");
    })

router.route("/registration")
    .get((req, res, next) => {
        res.render('user/registration.njk');
    })
    .post((req, res, next) => {
        // TODO: form handler middleware
        res.redirect("/user/confirmation");
    })

router.get("/confirmation", (req, res, next) => {
    res.render('user/confirmation.njk');
})

router.get("/contents", (req, res, next) => {
    res.render('user/contents.njk');
})

router.get("/profile", (req, res, next) => {
    res.render('user/profile.njk');
})

router.get("/profile/password", (req, res, next) => {
    res.render('user/change-password.njk');
})

module.exports = router;