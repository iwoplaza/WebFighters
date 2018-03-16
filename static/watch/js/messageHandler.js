var MessageHandler = {};
MessageHandler.messageCallbacks = {};
MessageHandler.messageCallbacks[Coder.Messages.WATCH_INIT] = function(packet) {
	let msg = packet[0];
	packet.splice(0, 1);
	console.log('Got a response: ' + msg.response);
	
	game.players = [];
	for(let i = 0; i < msg.numOfPlayers; ++i) {
		let data = packet[0];
		packet.splice(0, 1);
		console.dir(data);
		let player = game.addPlayer(new Player(data.id, data.name));
		player.location.x = data.x;
		player.location.y = data.y;
	}
	console.dir(game.players);
	game.world.platforms = [];
	for(let i = 0; i < msg.numOfPlatforms; ++i) {
		let data = packet[0];
		packet.splice(0, 1);
		console.dir(data);
		game.world.addPlatform(new Platform(data.minX, data.maxX, data.y, data.height));
	}
	
	if(msg.response == 0) {
		startSpectating(msg);
	}else{
		console.error('Failed to spectate the game.');
		return;
	}
}

MessageHandler.messageCallbacks[Coder.Messages.WATCH_UPDATE] = function(packet) {
	let msg = packet[0];
	packet.splice(0, 1);
	
	for(let i = 0; i < msg.numOfPlayers; ++i) {
		let data = packet[0];
		packet.splice(0, 1);
		let player = game.players[data.id];
		if(player) {
			player.location.x = data.x;
			player.location.y = data.y;
			player.velocity.x = data.velX;
			player.velocity.y = data.velY;
			player.turn = data.turn ? true : false;
		}
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

MessageHandler.messageCallbacks[Coder.Messages.PLAYER_NEW] = function(packet) {
	let msg = packet[0];
	let player = game.players[msg.player];
	if(player) {
		console.error('The player already exists.');
		return;
	}
	
	console.log('Got an new player');
	
	let data = packet[1];
	console.dir(data);
	player = game.addPlayer(new Player(data.id, data.name));
	player.location.x = data.x;
	player.location.y = data.y
}

MessageHandler.send = function(message) {
	WebHandler.socket.send(message);
}

MessageHandler.decode = function(packet) {
	var header = packet.charCodeAt(0);

    if(this.messageCallbacks[header] != undefined) {
        this.messageCallbacks[header](Coder.decode(packet));
    }else{
        console.warn("Warning: Recieved a message with an unhandled message header (" + header + ")");
    }
}