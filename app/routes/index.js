const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('index.njk');
})

router.get("/internalServerError", (req, res, next) => {
    res.render('internalServerError.njk');
})

module.exports = router;