const ws = require('ws');
const {verifyToken} = require('../users/utils/tokenHandler')


let wss;

module.exports = function (server) {
    wss = new ws.WebSocketServer({
       // server: server,
        noServer: true,
        path: '/rooms'
    });
    wss.on('connection', function connection(webSocket, request, client) {
        console.log(request, client);
        webSocket.on('message', message => messageBroadcast(message));
    });
    server.on('upgrade', async (request, socket, head) => upgrade(request, socket, head));

};

function authUser(request, callback) {
    console.log(request); //TODO: Реализовать проверку токена
   let client = "userNameMM";
    callback(null, client);
}

function upgrade(request, socket, head) {
    authUser(request, function next(err, client) {
        if (err || !client) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request, client);
        });
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
