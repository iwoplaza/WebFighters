var WebHandler = {};

WebHandler.socket = null;

WebHandler.onMessage = function(msg) {
	MessageHandler.decode(msg.data);
}

WebHandler.init = function(callback) {
	let address = 'ws://'+window.location.hostname+':5000';
	console.log('Connecting to ' + address);
	WebHandler.socket = new WebSocket(address, "connect");
	WebHandler.socket.addEventListener('open', function(event) {
		WebHandler.socket.addEventListener('message', WebHandler.onMessage);
		callback();
	});
}