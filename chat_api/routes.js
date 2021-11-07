const router = require('express').Router();
const chatRouter = require('../chat/routes');

router.use('/rooms', chatRouter);

module.exports = router;