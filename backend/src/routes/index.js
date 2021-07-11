const router = require('express').Router();
const discord = require('./discord')
const auth = require('./auth')

router.use("/auth", auth)
router.use("/discord", discord)

module.exports = router;