const ws = require('ws');
const {authByToken} = require('../users/utils/tokenHandler')

let wss;
ws.Server.prototype.shouldHandle = (req) => {
    const regex = new RegExp('^/(rooms)/[a-zA-Z0-9]+$');
    return regex.test(req.url);
};

module.exports = function (server) {
    wss = new ws.WebSocketServer({
        noServer: true
    });

    wss.on('connection', function connection(webSocket, request, user) {
        webSocket.user = user;
        webSocket.on('message', message => messageBroadcast(message));
        webSocket.send(JSON.stringify({message: `Привет, ${user.name}!`}));
    });

    server.on('upgrade', async (request, socket, head) => upgrade(request, socket, head));
    return wss;
};

async function upgrade(request, socket, head) {
    let user;
    try {
        user = await authByToken(request);
    } catch (err) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request, user);
    });
}

function messageBroadcast(data) {
    const messageObj = JSON.parse(data);
    wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
            client.send(`received: ${JSON.stringify(messageObj)}`);
        }
    })
}
