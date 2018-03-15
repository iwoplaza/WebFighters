ROOTPATH = __dirname;

console.log("Running Node.js version: " + process.version);

WebHandler = require("./server/webHandler.js");
MessageHandler = require("./server/messageHandler.js");
Lobby = require('./server/lobby.js');
WebHandler.startServer(onServerStarted);

function onServerStarted() {
	WebHandler.io.on('connection', function(connection) {
		// This will hold meta information about the connection
		connection.session = {};
		
		connection.on('message', function(msg) {
			MessageHandler.decode(this, msg);
		});
		
		connection.on('disconnect', function() {
			Lobby.removeConnection(this);
		});
	});
}