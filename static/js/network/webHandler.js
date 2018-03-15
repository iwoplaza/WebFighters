var WebHandler = {};

WebHandler.socket = null;

WebHandler.onMessage = function(msg) {
	MessageHandler.decode(msg);
}

WebHandler.init = function(callback) {
	WebHandler.socket = io();
	WebHandler.socket.on('connect', function(data) {
		WebHandler.socket.on('message', WebHandler.onMessage);
		callback();
	});
}