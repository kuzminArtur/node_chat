const router = require('express').Router();
const { chatRouter } = require('../chat');
const { userRouter } = require('../users');

router.use('', userRouter);
router.use('/rooms', chatRouter);

module.exports = router;
