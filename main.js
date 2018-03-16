ROOTPATH = __dirname;

console.log("Running Node.js version: " + process.version);

WebHandler = require("./server/webHandler.js");
MessageHandler = require("./server/messageHandler.js");
Lobby = require('./server/lobby.js');
WebHandler.startServer(onServerStarted);

function onServerStarted() {
	WebHandler.io.on('request', function(request) {
        var connection = request.accept('connect', request.origin);
        console.log('Connection from ' + request.origin + ' accepted.');
		
		// This will hold meta information about the connection
		connection.session = {};
		
		connection.on('message', function(message) {
            if (message.type === 'utf8') {
                MessageHandler.decode(this, message.utf8Data);
			}
		});
		
		connection.on('close', function(e) {
			Lobby.removeConnection(this);
		});
	});
}