var MessageHandler = {};

MessageHandler.decode = function(packet) {
	let header = packet.charAt(0);
	console.log('Decoding ', header);
}