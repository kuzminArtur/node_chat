const chatRouter = require('./routes');
const { startWebSocketServer } = require('./webSocket/webSoket');

module.exports = { chatRouter, startWebSocketServer };
