var MessageHandler = {};
MessageHandler.messageCallbacks = {};
MessageHandler.messageCallbacks[Coder.Messages.WATCH_INIT] = function(packet) {
	let msg = packet[0];
	console.log('Got a response: ' + msg.response);
	
	if(msg.response == 0) {
		startSpectating(msg);
	}else{
		console.error('Failed to spectate the game.');
		return;
	}
}
MessageHandler.messageCallbacks[Coder.Messages.PLAYER_ACTION_UPDATE] = function(packet) {
	let msg = packet[0];
	console.log('Got an action: ' + msg.action);
	let player = game.players[msg.player];
	if(!player) {
		console.error('The player information is not in sync.');
		return;
	}
	
	switch(msg.action) {
		case 0:
			player.jumpBegin();
			break;
		case 1:
			player.jumpStop();
			break;
		case 2:
			player.move(-1);
			break;
		case 3:
			player.move(1);
			break;
		case 4:
			player.move(0);
			break;
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