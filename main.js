ROOTPATH = __dirname;

console.log("Running Node.js version: " + process.version);

var WebHandler = require("./server/WebHandler.js");
var ServerMessageHandler = require("./server/ServerMessageHandler.js");
var Player = require('./server/Player.js');
WebHandler.startServer(onServerStarted);

function onServerStarted() {
	WebHandler.io.on('connection', function(connection) {
		connection.on('message', function(msg) {
			ServerMessageHandler.decode(this, msg);
		});
		
		connection.on('disconnect', function() {
			Player.removeConnection(this);
		});
	});
}