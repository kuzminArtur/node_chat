const ws = require("ws");

function messageBroadcast(data, wss) {
    const messageObj = JSON.parse(data);
    wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
            client.send(`received: ${JSON.stringify(messageObj)}`);
        }
    })
}

module.exports = {messageBroadcast};