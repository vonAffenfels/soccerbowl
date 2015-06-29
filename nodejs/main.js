var WebSocketServer = require('websocket').server;
var frontend = require("./frontend/main");
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(16666, "srv-web.saij.de", function () {
    console.log((new Date()) + ' Server is listening on port 16666');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

var connections = [];

frontend.onChange = function(val) {
    console.log("Data changed, sending to " + connections.length + " devices");
    var buffer = new Buffer(val, "hex");
    for(var i = 0; i < connections.length; i++) {
        connections[i].sendBytes(buffer);
    }
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    var index = connections.push(connection);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('close', function(reasonCode, description) {
        connections.splice(index, 1);
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
