const ws = require('ws');

module.exports = function (server) {
    const wss = new ws.WebSocketServer({
        server
    });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            const message = JSON.parse(data);
            ws.send(`received: ${JSON.stringify(message)}`);
        });

    });
};
