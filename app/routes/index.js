const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('index.njk');
})

router.get("/documentation", (req, res, next) => {
    res.render('documentation.njk');
})

router.get("/story", (req, res, next) => {
    res.render('story.njk');
})

router.get("/internalServerError", (req, res, next) => {
    res.render('internalServerError.njk');
})

module.exports = router;