Game = require('./game.js');

var Lobby = {};
Lobby.games = [];

Lobby.getFreeGameId = function() {
	let freeId = 0;
	while(Lobby.games[freeId] != undefined)
		freeId++;
	
	return freeId;
}

Lobby.createNewGame = function() {
	var game = new Game(Lobby.getFreeGameId());
	Lobby.games[game.id] = game;
	return game;
}

Lobby.getGame = function(id) {
	return Lobby.games[id];
}

Lobby.getOrCreateGame = function() {
	let game = this.getGame(0);
	
	if(!game)
		game = Lobby.createNewGame();
		
	return game;
}

Lobby.removeConnection = function(connection) {
	let game = Lobby.games[connection.session.gameId];
	if(game != undefined) {
		game.removeConnection(connection);
	}
}

module.exports = Lobby;