var express     = require('express');
var socketio    = require('socket.io');
var http        = require('http');

var app     = express();
var server  = http.createServer(app);
var io      = socketio.listen(server);

app.use(express.static(__dirname + "/public"));

var matrix      = [];
var matrixWidth = 32;
var matrixSize  = 32 * 32;

for (var i = 0; i < matrixSize; i++) {
    matrix.push({'red': 0, 'green': 0, 'blue': 0});
}

function indexToCoords(index) {
    var x = index % matrixWidth;
    var y = Math.floor(index / matrixWidth);
    return [x, y]
}

io.on('connection', function (socket) {
    console.log((new Date()) + ' Frontend Connection established');

    socket.on('getMatrix', function(cb) {
        // console.log((new Date()) + ' Sending whole matrix');
        cb(matrix);
    });

    socket.on('setPixelIndex', function(data) {
        // console.log((new Date()) + ' setPixelIndex');
        matrix[data.index] = data.color;
        socket.broadcast.emit('setPixel', data);

        coords = indexToCoords(data.index);
        if (typeof(exports.serverIo) != 'undefined') {
            exports.serverIo.emit('SetPixel', {
                'x': coords[0],
                'y': coords[1],
                'color': data.color
            });
            exports.serverIo.emit('SwapBuffers');
        }
    });

    socket.on('fill', function(data) {
        // console.log((new Date()) + ' fill');
        for (var i = 0; i < matrixSize; i++) {
            matrix[i] = data.color;
        }
        socket.broadcast.emit('reloadMatrix', matrix);

        if (typeof(exports.serverIo) != 'undefined') {
            exports.serverIo.emit('Fill', data.color);
            exports.serverIo.emit('SwapBuffers');
        }
    });
});

server.listen(11666, function () {
    console.log((new Date()) + ' Frontend is listening on port 11666');
});

exports.serverIo = undefined;
exports.getMatrix = function() {
    return matrix;
}