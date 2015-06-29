var backend = require('./backend');
var frontend = require('./frontend');

frontend.onDoCommands = function(commands) {
    backend.sendCommands(commands);
}