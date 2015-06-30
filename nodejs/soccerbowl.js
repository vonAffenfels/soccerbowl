var backend = require('./backend');
var frontend = require('./frontend');

backend.getMatrix = frontend.getMatrix
frontend.serverIo = backend.io;