var socketio    = require('socket.io');
var http        = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(404);
    response.end();
});

var io = socketio.listen(server);

server.listen(16666, function () {
    console.log((new Date()) + ' Server is listening on port 16666');
});

exports.io = io;