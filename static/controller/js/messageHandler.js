var MessageHandler = {};
MessageHandler.messageCallbacks = {};
MessageHandler.messageCallbacks[Coder.Messages.JOIN_RESPONSE] = function(packet) {
	let msg = packet[0];
	console.log('Got a response: ' + msg.response);
	
	if(msg.response == 0) {
		onGameJoined();
	}else{
		console.error('Failed to join the game.');
		return;
	}
}


MessageHandler.decode = function(packet) {
	var header = packet.charCodeAt(0);

    if(this.messageCallbacks[header] != undefined) {
        this.messageCallbacks[header](Coder.decode(packet));
    }else{
        console.warn("Warning: Recieved a message with an unhandled message header (" + header + ")");
    }
}