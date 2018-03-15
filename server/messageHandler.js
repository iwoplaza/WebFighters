var WebHandler;
var Coder = require("./../static/js/network/coder.js");

MessageHandler = {};
MessageHandler.messageCallbacks = {};

MessageHandler.messageCallbacks[Coder.Messages.PLAYER_ACTION] = function(connection, packet) {
	console.log('Got a player action:' + packet[0].action);
	console.dir(packet);
	
	let session = connection.session;
	if(!session) {
		console.error("Encountered a player with an invalid session.");
		return;
	}
	
	let game = Lobby.getGame(session.gameId);
	if(!game) {
		console.error("A player (" + session.player.name + ") is trying to play a non-existing game.");
		return;
	}
	
	let msg = Coder.encode({
		'action': 123
	});
	
	for(let player of game.players) {
		console.log(" - Sending update to " + player.name);
		player.connection.emit('message', msg, Coder.Messages.PLAYER_UPDATE);
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
		connection.emit('message', Coder.encode({response: 1}, Coder.Messages.JOIN_RESPONSE));
		return;
	}
	
	connection.emit('message', Coder.encode({response: 0}, Coder.Messages.JOIN_RESPONSE));
	console.log(msg.name+' joined the game!');
}

/*
WebHandler.io.sockets.emit('message', JSON.stringify({
				header: { type: 'new_chatter' },
				name: packet.name
			}));
*/

MessageHandler.decode = function(connection, msg) {
    var header = msg.charCodeAt(0);

    if(this.messageCallbacks[header] != undefined) {
        this.messageCallbacks[header](connection, Coder.decode(msg));
    }else{
        console.warn("Warning: Recieved a message with an unhandled message header (" + header + ")");
    }
}

module.exports = MessageHandler;