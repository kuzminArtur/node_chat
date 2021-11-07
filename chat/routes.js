const router = require('express').Router();
const messages = require('./controllers/messages');
const { getRooms, createRoom } = require('./controllers/rooms');


router.route('/')
    .get(getRooms)
    .post(createRoom);
module.exports = router;