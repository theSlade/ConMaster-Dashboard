const router = require('express').Router();

router.get("/", function (req, res, next) {
    res.send("OK OK chill man!")
})

module.exports = router;