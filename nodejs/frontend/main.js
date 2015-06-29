var express = require("express");
var socketIo = require("socket.io");
var app = express();
var server = require('http').createServer(app);
var io = socketIo.listen(server);
io.set("log level", 0);
var currentData = [];
for(var i = 0; i < (32 * 32); i++) {
    currentData.push("000000");
}
var api = {

    onChange: function(val) {
        // Changes HANDLE IT
    }

}


app.use(express.static(__dirname + "/public"));

io.sockets.on('connection', function (socket) {

    socket.on("load", function(cb) {
        cb(currentData);
    });

    socket.on("change", function(data, cb) {
        currentData = data;

        if(currentData.length > (32 * 32)) {
            currentData = currentData.splice(0, (32 * 32));
        }

        socket.broadcast.emit("change", data);
        api.onChange(currentData.join(""));
    });

});

server.listen(11666, "srv-web.saij.de");

module.exports = exports = api;
