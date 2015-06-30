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

var sockets = [];

io.on('connection', function (socket) {
    console.log((new Date()) + ' Connection established');
    sockets.push(socket);

    socket.on('GetMatrix', function(cb) {
        console.log((new Date()) + ' GetMatrix');
        cb(matrix);
    });

    socket.on('SetPixelIndex', function(data) {
        console.log((new Date()) + ' SetPixelIndex');
        matrix[data.index] = data.color;
        io.emit('SetPixelIndex', data);
        io.emit('SwapBuffers');
    });

    socket.on('Fill', function(data) {
        console.log((new Date()) + ' Fill');
        for (var i = 0; i < matrixSize; i++) {
            matrix[i] = data.color;
        }
        io.emit('Fill', data);
        io.emit('SwapBuffers');
    });

    socket.on('RequestPhotos', function(cb) {
        console.log((new Date()) + ' RequestPhotos')
        sockets.forEach(function (val) {
            val.emit('MakePhoto', function (data) {
                console.log((new Date()) + ' MakePhoto Callback');
                cb(data);
            })
        })
    });
});

server.listen(11666, function () {
    console.log((new Date()) + ' Server is listening on port 11666');
});

// Reload matrix every 10 minutes
setInterval(function() {
    console.log((new Date()) + ' emitting ReloadMatrix')
    io.emit('ReloadMatrix', {'matrix': matrix})
}, 10 * 60 * 1000);