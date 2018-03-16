var WebHandler;
var Coder = require("./../static/js/network/coder.js");

MessageHandler = {};
MessageHandler.messageCallbacks = {};

MessageHandler.messageCallbacks[Coder.Messages.PLAYER_ACTION] = function(connection, packet) {
	let msg = packet[0];
	console.log('Got a player action:' + msg.action);
	console.dir(packet);
	
	let session = connection.session;
	if(!session || !session.player) {
		console.error("Encountered a player with an invalid session.");
		return;
	}
	
	let game = Lobby.getGame(session.gameId);
	if(!game) {
		console.error("A player (" + session.player.name + ") is trying to play a non-existing game.");
		return;
	}
	
	let response = Coder.encode({
		player: session.player.id,
		action: msg.action
	}, Coder.Messages.PLAYER_ACTION_UPDATE);
	
	for(let watcher of game.watchers) {
		console.log(" - Sending update to spectator");
		MessageHandler.send(watcher.connection, response);
	}
}

MessageHandler.messageCallbacks[Coder.Messages.JOIN_REQUEST] = function(connection, packet) {
	let msg = packet[0];
	
	console.log('A player wants to join the game: ' + msg.name);
	console.dir(msg);
	
	let game = Lobby.getOrCreateGame();
	if(!game) {
		console.error("Couldn't create a new game/get a game for the player: " + msg.name);
		return;
	}
	
	var player = game.addPlayer(connection, msg.name);
	if(!player) {
		console.error("There was an error while \""+msg.name+"\" was trying to join.");
		MessageHandler.send(connection, Coder.encode({response: 1}, Coder.Messages.JOIN_RESPONSE));
		return;
	}
	
	MessageHandler.send(connection, Coder.encode({response: 0}, Coder.Messages.JOIN_RESPONSE));
	console.log(msg.name+' joined the game!');
	
	let watchInitResponse = Coder.encode({
		id: player.id,
		name: player.name,
		x: player.location.x,
		y: player.location.y
	}, Coder.Messages.PLAYER_INIT_DATA);
	
	MessageHandler.send(connection, Coder.encode({response: 0}, Coder.Messages.WATCH_INIT) + watchInitResponse);
}

MessageHandler.messageCallbacks[Coder.Messages.WATCH_REQUEST] = function(connection, packet) {
	let msg = packet[0];
	
	console.log('Someone wants spectate the game');
	
	let game = Lobby.getOrCreateGame();
	if(!game) {
		console.error("Couldn't create a new game/get a game for the spectator.");
		return;
	}
	
	game.addWatcher(connection);
	
	let watchInitResponse = "";
	for(let i in game.players) {
		if(game.players[i]) {
			let player = game.players[i];
			console.log('Sending player: ' + player.name);
			watchInitResponse += Coder.encode({
				id: player.id,
				name: player.name,
				x: player.location.x,
				y: player.location.y
			}, Coder.Messages.PLAYER_INIT_DATA);
			console.log(Coder.decode(watchInitResponse));
	 	}
	}
	MessageHandler.send(connection, Coder.encode({response: 0}, Coder.Messages.WATCH_INIT) + watchInitResponse);
}

MessageHandler.decode = function(connection, msg) {
    var header = msg.charCodeAt(0);

    if(this.messageCallbacks[header] != undefined) {
        this.messageCallbacks[header](connection, Coder.decode(msg));
    }else{
        console.warn("Warning: Recieved a message with an unhandled message header (" + header + ")");
    }
}

MessageHandler.send = function(connection, message) {
	connection.sendUTF(message);
}

module.exports = MessageHandler;