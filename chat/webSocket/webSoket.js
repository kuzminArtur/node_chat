const ws = require('ws');
const {messageBroadcast} = require('./messages');
const {auth} = require('./auth');
const {getRooms} = require('../utils/rooms')


ws.Server.prototype.shouldHandle = (req) => {
    const roomsNames = getRooms();
    const regex = new RegExp(`^/(rooms)/(${roomsNames.join('|')})+$`);
    return regex.test(req.url);
};

const startWebSocketServer = (server) => {
    const wss = new ws.WebSocketServer({
        noServer: true
    });

    wss.on('connection', function connection(webSocket, request, user) {
        webSocket.user = user;
        webSocket.on('message', message => messageBroadcast(message, wss));
        webSocket.send(JSON.stringify({message: `Привет, ${user.name}!`}));
    });

    server.on('upgrade', async (request, socket, head) => auth(wss, request, socket, head));
};

module.exports = {startWebSocketServer};