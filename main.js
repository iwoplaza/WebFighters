ROOTPATH = __dirname;

console.log("Running Node.js version: " + process.version);

WebHandler = require("./server/webHandler.js");
MessageHandler = require("./server/messageHandler.js");
Lobby = require('./server/lobby.js');
Time = require('./static/js/util/time.js');
WebHandler.startServer(onServerStarted);

var runInterval = null;
function run() {
	Time.update();
	Lobby.update();
}

var updateStateInverval = null;
function updateState() {
	Lobby.updateState();
}

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
	
	runInterval = setInterval(run, 15);
	updateStateInverval = setInterval(updateState, 250);
}