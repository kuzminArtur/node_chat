const router = require('express').Router();
const chatRouter = require('../chat/routes');
const userRouter = require('../users/routes');

router.use('', userRouter);
router.use('/rooms', chatRouter);

module.exports = router;
