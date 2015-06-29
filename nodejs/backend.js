var WebSocketServer = require('websocket').server;
var http            = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(404);
    response.end();
});

server.listen(16666, function () {
    console.log((new Date()) + ' Server is listening on port 16666');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    return true;
}

var connections = [];

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    var index = connections.push(connection);
    console.log((new Date()) + ' Connection accepted');

    connection.on('close', function(reasonCode, description) {
        connections.splice(index, 1);
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected');
    });
});

exports.sendCommands = function(commands) {
    for (var i = 0; i < connections.length; i++) {
        connections[i].send(JSON.stringify(commands));
    }
    console.log((new Date()) + ' Commands sent');
}