const router = require('express').Router();

const webhook = require('./webhook')
const message = require('./message')


router.use("/webhook",webhook);
router.use("/message",message)


module.exports = router;